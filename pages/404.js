import Layout from "@/components/Layout/Layout";
import ErrorComponent from "@/components/ErrorComponent/ErrorComponent";

export default function NotFoundPage() {
  return (
    <Layout title="404|Page_Not_Found">
      <ErrorComponent
        reaction="OOPS!"
        statusError="404 - Page not found"
        ErrorMessage="  ربما تمت إزالة الصفحة التي تبحث عنها أو أنها غير متاحة مؤقتًا"
        buttonTxt="الرجوع للقائمة الرئيسية"
        buttonUrl=""
      />
    </Layout>
  );
}
