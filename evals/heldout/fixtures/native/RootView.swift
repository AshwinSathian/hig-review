import SwiftUI

struct RootView: View {
    var body: some View {
        TabView {
            TodayView()
                .tabItem { Label("Today", systemImage: "pills") }
            MedicinesView()
                .tabItem { Label("Medicines", systemImage: "cross.vial") }
            AddMedicineView()
                .tabItem { Label("Add", systemImage: "plus.circle.fill") }
            HistoryView()
                .tabItem { Label("History", systemImage: "clock.arrow.circlepath") }
        }
    }
}
