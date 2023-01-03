import styles from "@/components/MyAccount/MyAccount.module.css";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function ProfileInfo({user, profile, handleEditMode}) {
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
                            data-aos-once='true'
                            className={styles.titleTable}
                            align="right"
                        >
                            تفاصيل الحساب
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableHead data-aos="fade-out" data-aos-once='true'>
                    <TableRow>
                        <TableCell align="left">{user?.first_name}</TableCell>
                        <TableCell align="right">الإسم الأول</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">{user?.last_name}</TableCell>
                        <TableCell align="right">الإسم الأخير</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">{user?.username}</TableCell>
                        <TableCell align="right">إسم المستخدم</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">{user?.email}</TableCell>
                        <TableCell align="right">البريد الإلكتروني</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">{profile?.address}</TableCell>
                        <TableCell align="right">العنوان</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">{profile?.city}</TableCell>
                        <TableCell align="right">المدينة</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">{profile?.building_number}</TableCell>
                        <TableCell align="right">رقم العمارة</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">{profile?.phone}</TableCell>
                        <TableCell align="right">رقم الهاتف </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">
                                <span className={user?.is_active ? styles.active : styles.deactive}>
                                    {user?.is_active ? "فعال" : "غير فعال"}
                                </span>
                        </TableCell>
                        <TableCell align="right">حالة الحساب</TableCell>
                    </TableRow>
                </TableHead>
            </Table>
            <button onClick={handleEditMode} className={styles.editBtn}>Edit</button>
        </TableContainer>
    );
}
