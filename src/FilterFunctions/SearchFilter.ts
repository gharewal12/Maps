import { uvrRenderer } from "../Renderer/UvrRenderer";

export function generateOtherSQLString(field: string) {
    // Loop through each uniqueValueInfos object and create a sql string to 
    // exclude all of these industries
    let sqlString = '';
    uvrRenderer.uniqueValueInfos.forEach(valueInfo => {
        sqlString += `${field} <> '${valueInfo.value}' AND `;
    });
    // cut out the last `AND` string from the final sql string
    // as the loop above adds one at the end
    let lastStrIndex = sqlString.lastIndexOf(`AND`);
    sqlString = sqlString.substring(0, lastStrIndex);

    return sqlString;
}
