import Typography from "@mui/material/Typography";

export type SummaryInfoRow = {
  id: string;
  label: string;
  name: string;
  amount: number;
  isPaid: boolean;
};

type SummaryInfoCardProps = {
  title: string;
  rows: SummaryInfoRow[];
  accentColor?: string;
};

const SummaryInfoCard = ({ title, rows, accentColor }: SummaryInfoCardProps) => {
  return (
    <div className="summaryCard">
      <div
        className="summaryCard__bar"
        style={accentColor ? { backgroundColor: accentColor } : undefined}
      />
      <div className="summaryCard__content">
        <Typography className="summaryCard__title" variant="subtitle1" component="h3">
          {title}
        </Typography>
        {rows.map((row) => (
          <div className="summaryCard__row" key={row.id}>
            <span className="summaryCard__label">{row.label}</span>
            <span className="summaryCard__name">{row.name}</span>
            <span
              className={
                row.isPaid
                  ? "summaryCard__amount summaryCard__amount--paid"
                  : "summaryCard__amount"
              }
            >
              {row.isPaid ? "PAID" : row.amount?.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryInfoCard;
