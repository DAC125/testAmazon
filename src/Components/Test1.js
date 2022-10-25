import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  pdf,
  PDFViewer,
} from "@react-pdf/renderer";
import React from "react";
import logo from "../Images/logo2.jpg";

const Test = (props) => {
  console.log(props);
  let now = new Date();
  let day = String(now.getDate() + 1);
  let month = String(now.getMonth() + 1);
  let year = now.getFullYear();

  let hours = String(now.getHours());
  let mins = String(now.getMinutes());

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        resolve(reader.result);
      };
    });
  };

  // document styles
  const styles = StyleSheet.create({
    page: {
      marginTop: "25px",
      padding: "50px",
    },
    imgDiv: {
      alignSelf: "center",
      width: "100%"
    },
    image: {
      display: "block",
      width: "20%",
      height: "auto",
      alignSelf: "center",
    },
    title: {
      textAlign: "center",
      fontSize: "15px",
    },
    title1: {
      textAlign: "center",
      fontSize: "18px",
      marginBottom: "5px",
      fontWeight: 400,
      letterSpacing: "2px",
    },
    title2: {
      textAlign: "center",
      fontSize: "26px",
      fontWeight: 700,
      marginBottom: "55px",
    },
    bold:{ 
      fontSize: "14px",
    },
    body: {
      marginTop: "50px",
      fontSize: "12px",
    },
    text: {
      marginBottom: "20px",
    },
    greetingsText: {
      marginLeft: "10px",
      fontSize: "15px",
      marginTop: "40px",
      marginBottom: "10px",
    },
    textDots: {
      marginTop: "10px",
      marginLeft: "50px",
      marginBottom: "70px",
    },
    textSign: {
      marginTop: "150px",
      textAlign: "center",
    },
    contact: {
      marginTop: "180px",
      textAlign: "center",
    },
    contactTitle: {
      fontSize: "14px",
      fontWeight: 700,
      marginBottom: "12px",
    },
    contactText: {
      fontSize: "12px",
      marginBottom: "10px",
    },
    section: { textAlign: "center", margin: 30 },
  });

  let MyDoc = "";

  switch (props.doc) {
    case "declaracion":
      MyDoc = (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.imgDiv}>
              <Image src={logo}  style={styles.image}/>
            </View>
            <View style={styles.title}>
              <Text>
                Declaración jurada para la solicitud de exoneración de bienes
                inmuebles en la Municipalidad de Sarchí
              </Text>
            </View>
            <View style={styles.body}>
              <Text style={styles.text}>
                Yo {props.data.data.name}, con domicilio en, "CITY" distrito
                "DISTRIT" cantón "CANTON", provincia "STATE", con documento de
                identidad No.
                {props.data.data.idNumber}
              </Text>
              <Text>
                Solicito, a travé de la presente declaración jurada, la
                exoneración de bienes inmuebles, declarando bajo fe de juramento
                que cumplo los siguentes requisitos:
              </Text>
              <View style={styles.textDots}>
                <Text> • Estar al dia con los pagos municipales</Text>
                <Text> • Contar con un único bien a nivel nacional</Text>
                <Text>
                  {" "}
                  • Certificación del Registro Publico Nacional donde indica que
                  posee un único bien inmueble a nivel nacional
                </Text>
              </View>
              <Text>
                Firmo en {props.data.data.address}, a las {hours}:{mins} horas
                del {day} del mes {month} del {year}
              </Text>

              <Text style={styles.textSign}>
                Firma:
                _________________________________________________________________
              </Text>
            </View>
          </Page>
        </Document>
      );
      break;

    case "voucher":
      MyDoc = (
        <Document>
          <Page size="A4" style={styles.page}>
          <View style={styles.imgDiv}>
              <Image src={logo}  style={styles.image}/>
            
              <Text style={styles.title1}>Municipalidad</Text>
              <Text style={styles.title2}>de Sarchí</Text>
            </View>
            <View style={styles.title}>
              <Text> Comprobante de trámite de exoneración de bien único</Text>
            </View>

            <View style={styles.body}>
              <Text style={styles.greetingsText}>
                Estimada persona usuaria,{" "}
              </Text>
              <Text style={styles.text}>
                Se ha generado el comprobante No a nombre de <Text style={styles.bold}>{props.data.name}</Text>,
                cédula de identidad <Text style={styles.bold}>{props.data.idNumber}</Text>, y dirección física{" "}
                <Text style={styles.bold}>{props.data.address}</Text> sobre la solicitud de trámite de
                exoneración de bien único de la Municipalidad de Sarchí.{" "}
              </Text>
              <View style={styles.contact}>
                <Text style={styles.contactTitle}>
                  Para más información sobre el trámite contactar:
                </Text>
                <Text style={styles.contactText}>
                  melanie.marin@munisarchi.go.cr
                </Text>
                <Text style={styles.contactText}>
                  Lunes a viernes: 7:00a.m. - 4:00 p.m.
                </Text>
                <Text style={styles.contactText}>2454 4001, ext. 111</Text>
                <Text style={styles.contactText}>2454-1664</Text>
              </View>
            </View>
          </Page>
        </Document>
      );
      break;
    case "failedRequest":
      MyDoc = (
        <Document>
          <Page size="A4" style={styles.page}>
          <View style={styles.imgDiv}>
              <Image src={logo}  style={styles.image}/>
            </View>
            <View style={styles.title}>
              <Text>Comprobante de trámite de exoneración de bien único</Text>
            </View>

            <View style={styles.body}>
              <Text style={styles.greetingsText}>
                Estimada persona usuaria,{" "}
              </Text>
              <Text style={styles.text}>
                Se ha rechazado su solicitud de trámite No <Text style={styles.bold}>{props.data.data.seq}</Text>{" "}
                a nombre de <Text style={styles.bold}>{props.data.data.name}</Text>, cédula de identidad{" "}
                <Text style={styles.bold}>{props.data.data.idNumber}</Text> y direccion física{" "}
                <Text style={styles.bold}>{props.data.data.address}</Text>. Favor contactar al departamento de
                Bienes Inmuebles en atención a su solicitud
              </Text>
              <View style={styles.contact}>
                <Text style={styles.contactTitle}>
                  Para más información sobre el trámite contactar:
                </Text>
                <Text style={styles.contactText}>
                  melanie.marin@munisarchi.go.cr
                </Text>
                <Text style={styles.contactText}>
                  Lunes a viernes: 7:00a.m. - 4:00 p.m.
                </Text>
                <Text style={styles.contactText}>2454 4001, ext. 111</Text>
                <Text style={styles.contactText}>2454-1664</Text>
              </View>
            </View>
          </Page>
        </Document>
      );
      break;
    case "succesRequest":
      MyDoc = (
        <Document>
          <Page size="A4" style={styles.page}>
          <View style={styles.imgDiv}>
              <Image src={logo}  style={styles.image}/>
            </View>
            <View style={styles.title}>
              <Text>Comprobante de trámite de exoneración de bien único</Text>
            </View>

            <View style={styles.body}>
              <Text style={styles.greetingsText}>
                Estimada persona usuaria,{" "}
              </Text>
              <Text style={styles.text}>
                Se ha aceptado su solicitud de trámite No <Text style={styles.bold}>{props.data.data.seq}</Text>{" "}
                a nombre de <Text style={styles.bold}>{props.data.data.name}</Text>, cédula de identidad{" "}
                <Text style={styles.bold}>{props.data.data.idNumber}</Text> y direccion física{" "}
                <Text style={styles.bold}>{props.data.data.address}</Text>.
              </Text>
              <View style={styles.contact}>
                <Text style={styles.contactTitle}>
                  Para más información sobre el trámite contactar:
                </Text>
                <Text>melanie.marin@munisarchi.go.cr</Text>
                <Text>Lunes a viernes: 7:00a.m. - 4:00 p.m.</Text>
                <Text>2454 4001, ext. 111</Text>
                <Text>2454-1664</Text>
              </View>
            </View>
          </Page>
        </Document>
      );
      break;
  }

  return (
    <div style={{width: "50%"}}>
      <h1 style={{textAlign: "center"}}> small size bold +2px</h1>
      <PDFViewer style={{ width: "100%", height: "90vh" }}>{MyDoc}</PDFViewer>
     </div>
  );
};

export default Test;
