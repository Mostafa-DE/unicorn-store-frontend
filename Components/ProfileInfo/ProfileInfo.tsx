import styles from "@/components/MyAccount/MyAccount.module.css";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function MyAccount({userAccount, userProfile, handleEditMode}) {
    const {username, email} = userAccount;
    const {firstName, lastName, phone, address, city, building, deliveryPhone} = userProfile

    return (
        <TableContainer>
            <Table
                className={styles.containerTable}
                aria-label="simple table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell
                            data-aos="fade-out"
                            className={styles.titleTable}
                            align="right"
                        >
                            تفاصيل الحساب
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableHead data-aos="fade-out">
                    <TableRow>
                        <TableCell align="left">{firstName}</TableCell>
                        <TableCell align="right">الإسم الأول</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">{lastName}</TableCell>
                        <TableCell align="right">الإسم الأخير</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">{username}</TableCell>
                        <TableCell align="right">إسم المستخدم</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="right">البريد الإلكتروني</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">{address}</TableCell>
                        <TableCell align="right">العنوان</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">{city}</TableCell>
                        <TableCell align="right">المدينة</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">{building}</TableCell>
                        <TableCell align="right">رقم العمارة</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">{phone}</TableCell>
                        <TableCell align="right">رقم الهاتف الأساسي</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">{deliveryPhone}</TableCell>
                        <TableCell align="right">رقم هاتف للتوصيل</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left"><span className={styles.accountActive}>فعال</span></TableCell>
                        <TableCell align="right">حالة الحساب</TableCell>
                    </TableRow>
                </TableHead>
            </Table>
            <button onClick={handleEditMode} className={styles.editBtn}>Edit</button>
        </TableContainer>
    );
}
