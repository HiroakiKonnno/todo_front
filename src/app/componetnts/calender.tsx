import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles/calender.module.css";

type Props = {
  label: string;
  id: string;
  handleDateChange: (date: Date) => void;
  selectedDate: Date | null;
};

export const Calender = ({
  label,
  id,
  handleDateChange,
  selectedDate,
}: Props) => {
  return (
    <div>
      <label htmlFor="datetime" className={styles.label}>
        {label}
      </label>
      <DatePicker
        id={id}
        selected={selectedDate}
        onChange={(date) => handleDateChange(date as Date)}
        showTimeSelect={false}
        dateFormat="yyyy/MM/dd"
        placeholderText="日時を選択"
        className={styles.form}
      />
    </div>
  );
};
