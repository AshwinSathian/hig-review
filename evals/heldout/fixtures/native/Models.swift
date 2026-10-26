import SwiftUI
import Observation

struct Medicine: Identifiable, Codable, Hashable {
    var id = UUID()
    var name: String
    var strength: String
    var times: [DateComponents]   // hour/minute per daily dose
    var notes: String = ""
}

enum DoseStatus: String, Codable { case pending, taken, skipped }

struct Dose: Identifiable, Codable {
    var id = UUID()
    var medicineID: Medicine.ID
    var scheduled: Date
    var status: DoseStatus = .pending
    var resolvedAt: Date?
}

@Observable
final class MedStore {
    var medicines: [Medicine] = []
    var doses: [Dose] = []

    var today: [Dose] {
        doses.filter { Calendar.current.isDateInToday($0.scheduled) }
            .sorted { $0.scheduled < $1.scheduled }
    }
    var history: [Dose] {
        doses.filter { $0.status != .pending }.sorted { $0.scheduled > $1.scheduled }
    }

    func medicine(for dose: Dose) -> Medicine? { medicines.first { $0.id == dose.medicineID } }

    func resolve(_ dose: Dose, as status: DoseStatus) {
        guard let i = doses.firstIndex(where: { $0.id == dose.id }) else { return }
        doses[i].status = status
        doses[i].resolvedAt = .now
    }

    func add(_ m: Medicine) {
        medicines.append(m)
        let cal = Calendar.current
        for t in m.times {
            if let d = cal.date(bySettingHour: t.hour ?? 8, minute: t.minute ?? 0, second: 0, of: .now) {
                doses.append(Dose(medicineID: m.id, scheduled: d))
            }
        }
    }

    func delete(at offsets: IndexSet) {
        let ids = offsets.map { medicines[$0].id }
        medicines.remove(atOffsets: offsets)
        doses.removeAll { ids.contains($0.medicineID) }
    }

    func clearHistory() { doses.removeAll { $0.status != .pending } }
}

extension Color {
    init(hex: UInt32) {
        self.init(red: Double((hex >> 16) & 0xFF) / 255,
                  green: Double((hex >> 8) & 0xFF) / 255,
                  blue: Double(hex & 0xFF) / 255)
    }
    static let doseTakenText = Color(hex: 0x4B5563)
}
