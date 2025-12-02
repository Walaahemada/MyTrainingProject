const DataTable = ({ columns, data, actions, onActionClick }) => {
  return (
    <div style={{ marginTop: "20px" }} className="table-wrapper">
      <table className="gt-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.title}</th>
            ))}
            {actions && <th>الإجراءات</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
              {actions && (
                <td style={{height:"85px",display:"flex",justifyContent:"center",alignItems:"center"}}className="actions-box">
                  {actions.includes("عرض") && (
                    <button style={{height:"30px"}}
                      className="view-btn"
                      onClick={() => onActionClick?.("عرض", row)}
                    >
                      عرض
                    </button>
                  )}
                  {actions.includes("موافقة") && (
                    <button style={{height:"30px"}}
                      className="accept-btn"
                      onClick={() => onActionClick?.("موافقة", row)}
                    >
                      موافقة
                    </button>
                  )}
                  {actions.includes("رفض") && (
                    <button style={{height:"30px"}}
                      className="reject-btn"
                      onClick={() => onActionClick?.("رفض", row)}
                    >
                      رفض
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
