import json, sys, os, glob
src, dst = sys.argv[1], sys.argv[2]
os.makedirs(dst, exist_ok=True)
def inl(items, refs):
    out=[]
    for i in items or []:
        t=i.get('type')
        if t=='text': out.append(i['text'])
        elif t=='codeVoice': out.append('`'+i['code']+'`')
        elif t in('emphasis','strong'):
            w='*' if t=='emphasis' else '**'; out.append(w+inl(i.get('inlineContent'),refs)+w)
        elif t=='reference':
            r=refs.get(i.get('identifier'),{}); out.append(r.get('title') or i.get('identifier','').split('/')[-1])
        elif t=='link': out.append(i.get('title') or i.get('destination',''))
        elif t=='image': out.append('[image]')
        elif 'inlineContent' in i: out.append(inl(i['inlineContent'],refs))
    return ''.join(out)
def blk(items, refs, ind=''):
    out=[]
    for b in items or []:
        t=b.get('type')
        if t=='heading': out.append('\n'+'#'*b.get('level',2)+' '+b['text']+'\n')
        elif t=='paragraph': out.append(ind+inl(b['inlineContent'],refs)+'\n')
        elif t in('unorderedList','orderedList'):
            for n,it in enumerate(b['items'],1):
                body=blk(it.get('content'),refs,ind+'  ').strip()
                out.append(f"{ind}{'-' if t=='unorderedList' else str(n)+'.'} {body}")
            out.append('')
        elif t=='aside': out.append(ind+'> **'+(b.get('name') or b.get('style','Note'))+':** '+blk(b.get('content'),refs).strip().replace('\n',' ')+'\n')
        elif t=='table':
            rows=b.get('rows',[])
            for r_i,row in enumerate(rows):
                cells=[blk(c,refs).strip().replace('\n',' ') for c in row]
                out.append('| '+' | '.join(cells)+' |')
                if r_i==0: out.append('|'+'---|'*len(cells))
            out.append('')
        elif t=='row':
            for c in b.get('columns',[]): out.append(blk(c.get('content'),refs,ind))
        elif t=='tabNavigator':
            for tab in b.get('tabs',[]): out.append(f"\n**[{tab.get('title')}]**\n"+blk(tab.get('content'),refs,ind))
        elif t=='links':
            out.append(ind+'See: '+', '.join(refs.get(x,{}).get('title',x.split('/')[-1]) for x in b.get('items',[]))+'\n')
        elif t=='termList':
            for it in b.get('items',[]): out.append(f"- **{inl(it['term']['inlineContent'],refs)}**: "+blk(it['definition']['content'],refs).strip())
        elif t=='codeListing': out.append('```\n'+'\n'.join(b.get('code',[]))+'\n```')
        elif 'content' in b: out.append(blk(b['content'],refs,ind))
    return '\n'.join(out)
for f in glob.glob(src+'/*.json'):
    if os.path.basename(f).startswith('_nav'): continue
    d=json.load(open(f)); refs=d.get('references',{})
    title=d.get('metadata',{}).get('title','')
    md=['# '+title+'\n', inl(d.get('abstract'),refs)+'\n']
    for s in d.get('primaryContentSections',[]): md.append(blk(s.get('content'),refs))
    for s in d.get('topicSections',[]): md.append('\n## '+s.get('title','Topics')+'\n'+', '.join(refs.get(x,{}).get('title',x) for x in s.get('identifiers',[])))
    open(os.path.join(dst,os.path.basename(f)[:-5]+'.md'),'w').write('\n'.join(md))
