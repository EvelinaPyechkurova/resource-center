import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useSubjectsMap from "../../hooks/useSubjectsMap";

const CalendarView = ({ lessons }) => {

    const subjectsMap = useSubjectsMap();

    const navigate = useNavigate();

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // 0-based

    const calendar = useMemo(() => {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const startWeekDay = (firstDay.getDay() + 6) % 7; // shift to Monday start
        const totalDays = lastDay.getDate();

        const weeks = [];
        let currentWeek = Array(startWeekDay).fill(null);

        for (let day = 1; day <= totalDays; day++) {
            currentWeek.push(day);

            if (currentWeek.length === 7) {
                weeks.push(currentWeek);
                currentWeek = [];
            }
        }

        if (currentWeek.length) {
            while (currentWeek.length < 7) currentWeek.push(null);
            weeks.push(currentWeek);
        }

        return weeks;
    }, [year, month]);

    // group lessons by day
    const lessonsByDay = useMemo(() => {
        const map = {};

        lessons?.forEach(lesson => {
            const date = new Date(lesson.startsAt);
            const day = date.getDate();

            if (!map[day]) map[day] = [];
            map[day].push(lesson);
        });

        return map;
    }, [lessons]);

    const handleCreate = (day) => {
        // const date = new Date(year, month, day);
        const pad = (n) => String(n).padStart(2, '0');
        const iso = `${year}-${pad(month+1)}-${pad(day)}T12:00`;
        // const iso = date.toISOString().slice(0, 16);
        navigate(`/lessons/create?date=${iso}`);
    };

    return (
        <div className="calendar">

            <div className="calendar-header">
                {today.toLocaleString('default', { month: 'long' })} {year}
            </div>

            <div className="calendar-grid">

                {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
                    <div key={d} className="calendar-weekday">{d}</div>
                ))}

                {calendar.map((week, i) => (
                    week.map((day, j) => (
                        <div key={`${i}-${j}`} className="calendar-cell">

                            {day && (
                                <>
                                    <div className="calendar-day-number">{day}</div>

                                    {/* events */}
                                    <div className="calendar-events">
                                        {lessonsByDay[day]?.map(l => (
                                            <div
    key={l._id}
    className="calendar-event"
    onClick={() => navigate(`/lessons/${l._id}`)}
>
    <div className="calendar-event-title">
        {subjectsMap[l.subject] || "Loading..."}
    </div>

    <div className="calendar-event-meta">
        {l.type} – {new Date(l.startsAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        })}
    </div>
</div>
                                        ))}
                                    </div>

                                    {/* hover create */}
                                    <button
                                        className="calendar-add"
                                        onClick={() => handleCreate(day)}
                                    >
                                        +
                                    </button>
                                </>
                            )}

                        </div>
                    ))
                ))}

            </div>
        </div>
    );
};

export default CalendarView;