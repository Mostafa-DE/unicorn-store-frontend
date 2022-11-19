import styles from "@/components/Footer/Footer.module.css";
import Link from "next/link";

/*--------------------React Icons------------------------*/
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";
import { ImWhatsapp } from "react-icons/im";
import { SiMessenger } from "react-icons/si";
import { IoMailSharp } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { SiInstagram } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
/*-------------------------X----------------------------*/

export default function Header() {
  return (
    <footer
      className={`page-footer font-small mdb-color lighten-3 py-3 pt-4 bg-light ${styles.mainFooter}`}
    >
      <div className="container text-center text-md-left">
        <div className="row">
          {/*-----------------descripe about who we are--------------*/}
          <div className="col-md-4 col-lg-3 mr-auto my-md-4 my-0 mt-4 mb-1">
            <h5 className="font-weight-bold text-uppercase mb-4">
              Unicorns Store
            </h5>
            <p>
              متجر أون لاين متخصص في بيع جميع المنتجات المحلية والتركية كالألبسة
              والأدوات المنزلية والهديا وغيرها, خدمة التوصيل متوفرة لجميع أنحاء
              المملكة
            </p>
          </div>
          {/*-----------------------------X------------------------*/}
          <hr className="clearfix w-100 d-md-none" />
          {/*--------------terms & conditions & policies-----------*/}
          <div className="col-md-2 col-lg-2 mx-auto my-md-4 my-0 mt-4 mb-1">
            <h5 className="font-weight-bold text-uppercase mb-4">سياساتُنا</h5>
            <ul className="list-unstyled">
              <li>
                <p>
                  <Link href="/terms-policy/terms-conditions">
                    <a className={styles.link}> الأحكام و الشروط </a>
                  </Link>
                </p>
              </li>
              <li>
                <p>
                  <Link href="/terms-policy/privacy-policy">
                    <a className={styles.link}>سياسة خاصة</a>
                  </Link>
                </p>
              </li>
              <li>
                <p>
                  <Link href="/terms-policy/sales-policy">
                    <a className={styles.link}>سياسة المبيعات</a>
                  </Link>
                </p>
              </li>
              <li>
                <p>
                  <Link href="/terms-policy/refund-policy">
                    <a className={styles.link}>سياسة الاسترجاع</a>
                  </Link>
                </p>
              </li>
              <li>
                <p>
                  <Link href="/terms-policy/cancellation-policy">
                    <a className={styles.link}>سياسة الإلغاء</a>
                  </Link>
                </p>
              </li>
              <li>
                <p>
                  <Link href="/terms-policy/shipping-policy">
                    <a className={styles.link}>سياسة الشحن</a>
                  </Link>
                </p>
              </li>
            </ul>
          </div>
          {/*----------------------------X-------------------------*/}
          <hr className="clearfix w-100 d-md-none" />
          {/*--------------------Contact methods-------------------*/}
          <div className="col-md-4 col-lg-3 mx-auto my-md-4 my-0 mt-4 mb-1">
            <h5 className="font-weight-bold text-uppercase mb-4">تواصل معنا</h5>
            <ul className="list-unstyled">
              <li>
                <p>
                  <FaMapMarkerAlt className={styles.socialContact} />{" "}
                  <a className={styles.link} href="#">
                    الأردن , عمان , متجر على الانترنت
                  </a>
                </p>
              </li>
              <li>
                <p>
                  <FaMobileAlt className={styles.socialContact} />{" "}
                  <a
                    className={styles.link}
                    href="tel:0787834878"
                    target="_blank"
                  >
                    0787834878
                  </a>
                </p>
              </li>
              <li>
                <p>
                  <ImWhatsapp className={styles.socialContact} />{" "}
                  <a
                    className={styles.link}
                    href="https://wa.me/message/HRQFZDWSM3EUH1"
                    target="_blank"
                  >
                    0787834878
                  </a>
                </p>
              </li>
              <li>
                <p>
                  <SiMessenger className={styles.socialContact} />{" "}
                  <a
                    className={styles.link}
                    href="http://m.me/JoUnicornsStore"
                    target="_blank"
                  >
                    Unicorns Store
                  </a>
                </p>
              </li>
              <li>
                <p>
                  <IoMailSharp className={styles.socialContact} />{" "}
                  <a
                    className={styles.link}
                    href="https://mail.google.com/mail/?view=cm&source=mailto&to=aya551555.com"
                    target="_blank"
                  >
                    unicornStore51@gmail.com
                  </a>
                </p>
              </li>
            </ul>
          </div>
          {/*---------------------------X--------------------------*/}
          <hr className="clearfix w-100 d-md-none" />
          {/*--------------------Follow us social------------------*/}
          <div className="col-md-2 col-lg-2 text-center mx-auto my-4">
            <h5 className="font-weight-bold text-uppercase mb-4">تابعنا</h5>
            <a
              href="https://web.facebook.com/JoUnicornsStore"
              target="_blank"
              type="button"
              aria-label="Facebook"
              className={`btn-floating btn-fb ${styles.link} ${styles.social} `}
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/unicornsstore_jo/"
              target="_blank"
              type="button"
              aria-label="Instagram"
              className={`btn-floating btn-tw ${styles.link} ${styles.social} `}
            >
              <SiInstagram />
            </a>
            <a
              href="https://twitter.com/login"
              target="_blank"
              type="button"
              aria-label="Twitter"
              className={`btn-floating btn-dribbble ${styles.link} ${styles.social}  `}
            >
              <FaTwitter />
            </a>
          </div>
          {/*---------------------------X--------------------------*/}
        </div>
      </div>
      {/*-----------------Copy right & reserved----------------*/}
      <div className={styles.copyRight}>
        <p>
          Copyright © Unicorns Store All rights reserved || Made By
          <a href="https://www.linkedin.com/in/mostafa-de/" target="_blank">
            MOSTAFA FAYYAD
          </a>
        </p>
      </div>

      {/*--------------------------X---------------------------*/}
    </footer>
  );
}
