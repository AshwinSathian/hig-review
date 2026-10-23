import SwiftUI

struct AppTabView: View {
    @State private var selection = 0
    @State private var showNewSession = false

    var body: some View {
        VStack(spacing: 0) {
            Group {
                switch selection {
                case 0: ContentView()
                default: Text("Spots")
                }
            }
            .frame(maxHeight: .infinity)

            HStack {
                tab("Forecast", "water.waves", 0)
                Button { showNewSession = true } label: {
                    Image(systemName: "plus.circle.fill").font(.system(size: 44))
                }
                tab("Spots", "mappin", 1)
            }
            .padding(.vertical, 8)
            .background(Color.white)
        }
        .sheet(isPresented: $showNewSession) { Text("New session") }
    }

    func tab(_ title: String, _ icon: String, _ tag: Int) -> some View {
        Button { selection = tag } label: {
            VStack { Image(systemName: icon); Text(title).font(.caption) }
                .frame(maxWidth: .infinity)
        }
    }
}
