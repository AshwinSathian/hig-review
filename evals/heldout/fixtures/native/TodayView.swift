import SwiftUI

struct TodayView: View {
    @Environment(MedStore.self) private var store

    var body: some View {
        NavigationStack {
            Group {
                if store.today.isEmpty {
                    ContentUnavailableView("No doses today",
                                           systemImage: "checkmark.seal",
                                           description: Text("Add a medicine to start getting reminders."))
                } else {
                    List(store.today) { dose in
                        DoseRow(dose: dose)
                    }
                    .listStyle(.insetGrouped)
                }
            }
            .navigationTitle("Today")
        }
    }
}

struct DoseRow: View {
    @Environment(MedStore.self) private var store
    let dose: Dose

    var body: some View {
        let med = store.medicine(for: dose)
        HStack {
            VStack(alignment: .leading, spacing: 2) {
                Text(med?.name ?? "Unknown")
                    .font(.headline)
                Text(dose.scheduled, style: .time)
                    .font(.system(size: 13))
                    .foregroundStyle(dose.status == .taken ? Color.doseTakenText : .secondary)
            }
            Spacer()
            switch dose.status {
            case .pending:
                HStack(spacing: 16) {
                    Button {
                        store.resolve(dose, as: .skipped)
                    } label: {
                        Image(systemName: "forward.circle")
                    }
                    Button("Take") { store.resolve(dose, as: .taken) }
                        .buttonStyle(.borderedProminent)
                }
                .buttonStyle(.borderless)
            case .taken:
                Label("Taken", systemImage: "checkmark.circle.fill")
                    .foregroundStyle(.green)
            case .skipped:
                Label("Skipped", systemImage: "forward.circle")
                    .foregroundStyle(.secondary)
            }
        }
    }
}
