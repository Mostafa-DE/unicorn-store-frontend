import styles from "@/components/MyAccount/MyAccount.module.css";
import {useState, useEffect, useContext} from "react";
import {AuthContext} from "@/context/AuthContext";
import {useRouter} from "next/router";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {API_URL} from "@/config/index";

export default function EditProfile({user, profile, handleEditMode}) {
    const router = useRouter();
    const {first_name, last_name, username, email, is_active} = user;
    const {phone, address, city, building_number} = profile
    // @ts-ignore
    const {updateProfile} = useContext(AuthContext);

    const [values, setValues] = useState({
        phone: phone ?? "",
        address: address ?? "",
        city: city ?? "",
        building_number: building_number ?? "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateProfile(values);
        handleEditMode();
        await router.replace(router.asPath);
    }

    useEffect(() => {
        ValidatorForm.addValidationRule("isPhoneNumber", value => {
            return (value.length === 10 || value === "")
        });

        ValidatorForm.addValidationRule("isLocalNumber", value => {
            return !!(value.match("078") || value.match("079") || value.match("077") || value === "");
        });
    });


    return (
        <ValidatorForm onSubmit={handleSubmit} style={{width: "100%"}}>
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
                            <TableCell align="left">
                                {first_name}
                            </TableCell>
                            <TableCell align="right">الإسم الأول</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">
                                {last_name}
                            </TableCell>
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
                            <TableCell align="left">
                                <TextValidator
                                    type="text"
                                    name="address"
                                    onChange={handleChange}
                                    value={values.address}
                                    variant="standard"
                                    validators={["required"]}
                                    errorMessages={["!! لا يمكنك ترك هذا الحقل فارغاً"]}
                                />
                            </TableCell>
                            <TableCell align="right">العنوان</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">
                                <TextValidator
                                    type="text"
                                    name="city"
                                    onChange={handleChange}
                                    value={values.city}
                                    variant="standard"
                                    validators={["required"]}
                                    errorMessages={["!! لا يمكنك ترك هذا الحقل فارغاً",]}
                                />
                            </TableCell>
                            <TableCell align="right">المدينة</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">
                                <TextValidator
                                    type="text"
                                    name="building_number"
                                    onChange={handleChange}
                                    value={values.building_number}
                                    variant="standard"
                                    validators={["required"]}
                                    errorMessages={["!! لا يمكنك ترك هذا الحقل فارغاً"]}
                                />
                            </TableCell>
                            <TableCell align="right">رقم العمارة</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">
                                <TextValidator
                                    type="text"
                                    name="phone"
                                    onChange={handleChange}
                                    value={values.phone}
                                    variant="standard"
                                    validators={["required", "isPhoneNumber", "isLocalNumber"]}
                                    errorMessages={[
                                        "!! لا يمكنك ترك هذا الحقل فارغاً",
                                        "!! رقم الهاتف يجب أن يتكون من 10 أرقام فقط",
                                        "(078 , 079, 077) رقم الهاتف يجب أن يبدأ ب"
                                    ]}
                                />
                            </TableCell>
                            <TableCell align="right">رقم الهاتف </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">
                                <span className={is_active ? styles.active : styles.deactive}>
                                    {is_active ? "فعال" : "غير فعال"}
                                </span>
                            </TableCell>
                            <TableCell align="right">حالة الحساب</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                <button type="submit" className={styles.editBtn}>Save</button>
                <button onClick={handleEditMode} className={styles.cancelBtn}>Cancel</button>
            </TableContainer>
        </ValidatorForm>
    );
}
