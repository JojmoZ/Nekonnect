import Text "mo:base/Text";
import Int "mo:base/Int";
import Time "mo:base/Time";
import Source "mo:uuid/async/SourceV4";
import UUID "mo:uuid/UUID";

module {

    public func generateUUID() : async Text {
        let g = Source.Source();
        return UUID.toText(await g.new());
    };

    public func timeToDateString(time : Time.Time) : Text {
        let timeInSeconds = time / 1_000_000_000;

        let secondsPerDay = 86400; // 60 * 60 * 24
        let daysSinceEpoch = timeInSeconds / secondsPerDay;

        var year = 1970;
        var remainingDays = daysSinceEpoch;

        var done = false;

        while (remainingDays >= 365 and not done) {
            if (isLeapYear(year)) {
                if (remainingDays >= 366) {
                    remainingDays -= 366;
                    year += 1;
                } else {
                    done := true;
                };
            } else {
                if (remainingDays >= 365) {
                    remainingDays -= 365;
                    year += 1;
                } else {
                    done := true;
                };
            };
        };

        let monthDays = if (isLeapYear(year)) [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
                        else [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        var month = 1;
        var foundMonth = false;

        for (daysInMonth in monthDays.vals()) {
            if (not foundMonth) {
                if (remainingDays < daysInMonth) {
                    foundMonth := true;
                } else {
                    remainingDays -= daysInMonth;
                    month += 1;
                };
            };
        };

        let day = remainingDays + 1; 

        let dayText = if (day < 10) "0" # Int.toText(day) else Int.toText(day);
        let monthText = if (month < 10) "0" # Int.toText(month) else Int.toText(month);
        let yearText = Int.toText(year);

        dayText # "/" # monthText # "/" # yearText;
    };

    func isLeapYear(year : Int) : Bool {
        (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0);
    };



}