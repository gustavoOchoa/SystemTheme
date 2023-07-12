import style from "./Columns.module.css";
import EyeSearch from "./EyeSearch";

export default function EyeSearchRow({ data, totalWidth, gridAttr, setEyeSearchFilter, eyeSearchFilter }) {
  return (
    <table style={{ width: totalWidth + "px" }}>
      <tbody>
        <tr key={1} className={[style.tr_rel].join(" ")}>
          {data.map((item, index) => {
            return (
                <td key={index} 
                style={{width: gridAttr[index].width+'px'}}>
                    <EyeSearch
                    data={item.D_COLUMN_NAME}                    
                    setEyeSearchFilter={setEyeSearchFilter}
                    eyeSearchFilter={eyeSearchFilter}
                    />
                </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
}
