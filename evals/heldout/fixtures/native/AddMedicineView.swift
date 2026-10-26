import SwiftUI

struct AddMedicineView: View {
    @Environment(MedStore.self) private var store
    @State private var name = ""
    @State private var strength = ""
    @State private var timeText = "08:00"
    @State private var times: [DateComponents] = []
    @State private var notes = ""

    private var parsedTime: DateComponents? {
        let p = timeText.split(separator: ":").compactMap { Int($0) }
        guard p.count == 2, (0..<24).contains(p[0]), (0..<60).contains(p[1]) else { return nil }
        return DateComponents(hour: p[0], minute: p[1])
    }

    var body: some View {
        NavigationStack {
            Form {
                Section("Medicine") {
                    TextField("Name", text: $name)
                    TextField("Strength, e.g. 500 mg", text: $strength)
                }
                Section("Schedule") {
                    ForEach(times.indices, id: \.self) { i in
                        Text(String(format: "%02d:%02d", times[i].hour ?? 0, times[i].minute ?? 0))
                    }
                    HStack {
                        TextField("HH:MM", text: $timeText)
                            .keyboardType(.numbersAndPunctuation)
                        Button("Add time") {
                            if let t = parsedTime { times.append(t) }
                        }
                        .disabled(parsedTime == nil)
                    }
                }
                Section("Notes") {
                    TextField("Optional", text: $notes, axis: .vertical)
                }
                Section {
                    Button("Save medicine") {
                        store.add(Medicine(name: name, strength: strength, times: times, notes: notes))
                        name = ""; strength = ""; times = []; notes = ""
                    }
                    .disabled(name.isEmpty || times.isEmpty)
                }
            }
            .navigationTitle("Add Medicine")
        }
    }
}
