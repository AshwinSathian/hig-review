import SwiftUI

struct MedicinesView: View {
    @Environment(MedStore.self) private var store

    var body: some View {
        NavigationStack {
            List {
                ForEach(store.medicines) { med in
                    VStack(alignment: .leading) {
                        Text(med.name).font(.headline)
                        Text(med.strength).font(.subheadline).foregroundStyle(.secondary)
                    }
                }
                .onDelete { store.delete(at: $0) }
            }
            .navigationTitle("Medicines")
        }
    }
}
