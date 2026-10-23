import SwiftUI

struct Session: Identifiable {
    let id = UUID()
    let spot: String
    let summary: String
}

struct ContentView: View {
    let sessions = [
        Session(spot: "Ocean Beach", summary: "4.2 ft at 13 s, light offshore"),
        Session(spot: "Linda Mar", summary: "2.8 ft at 11 s, onshore after 10")
    ]

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 12) {
                    Text("Today")
                        .font(.largeTitle.bold())
                        // Hard-coded colour used as text colour
                        .foregroundColor(Color(red: 0.31, green: 0.27, blue: 0.9))
                        .frame(maxWidth: .infinity, alignment: .leading)

                    ForEach(sessions) { s in
                        VStack(alignment: .leading, spacing: 4) {
                            Text(s.spot).font(.headline)
                            Text(s.summary)
                                .font(.subheadline)
                                .foregroundColor(.gray)
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding()
                        // Glass material on content rows
                        .background(.ultraThinMaterial)
                        .clipShape(RoundedRectangle(cornerRadius: 14))
                    }
                }
                .padding()
            }
            .navigationTitle("Swell")
        }
    }
}
