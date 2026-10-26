import SwiftUI

struct HistoryView: View {
    @Environment(MedStore.self) private var store
    @State private var confirmClear = false

    var body: some View {
        NavigationStack {
            Group {
                if store.history.isEmpty {
                    ContentUnavailableView("No history yet", systemImage: "clock",
                                           description: Text("Doses you take or skip will appear here."))
                } else {
                    List(store.history) { dose in
                        Label {
                            VStack(alignment: .leading) {
                                Text(store.medicine(for: dose)?.name ?? "Removed medicine")
                                Text(dose.scheduled.formatted(date: .abbreviated, time: .shortened))
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }
                        } icon: {
                            Image(systemName: dose.status == .taken ? "checkmark.circle" : "forward.circle")
                        }
                    }
                }
            }
            .navigationTitle("History")
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Clear", role: .destructive) { confirmClear = true }
                        .disabled(store.history.isEmpty)
                }
            }
            .confirmationDialog("Clear all history?", isPresented: $confirmClear, titleVisibility: .visible) {
                Button("Clear History", role: .destructive) { store.clearHistory() }
            } message: {
                Text("This can't be undone.")
            }
        }
    }
}
