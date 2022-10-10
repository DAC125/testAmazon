
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  pdf
} from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
// import "../CSS/CreatePDF.css";
import logo from "../Images/logo.png";

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      resolve(reader.result)
    };
  })
  
};



export async function createPDF(props) {
  let now = new Date();
  let day = String(now.getDate() + 1);
  let month = String(now.getMonth() + 1);
  let year = now.getFullYear();

  let hours = String(now.getHours());
  let mins = String(now.getMinutes());

  // document styles
  const styles = StyleSheet.create({
    page: {
      marginTop: "25px",
      padding: "50px",
    },
    image: {
      width: "200px",
      height: "200px",
      alignSelf: "center",
    },
    title: {
      textAlign: "center",
      fontSize: "15px",
    },
    body: {
      marginTop: "100px",
      fontSize: "10px",
    },
    text: {
      marginBottom: "20px",
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
    section: { textAlign: "center", margin: 30 },
  });

  // select the rigth document
  let MyDoc = "";

  switch (props.doc) {
    case "declaracion":
      MyDoc = (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.image}>
              <Image src={logo} />
            </View>
            <View style={styles.title}>
              <Text>
                Declaración jurada para la solicitud de exoneracion de bienes
                inmuebles en la Municipalidad de Sarchí
              </Text>
            </View>
            <View style={styles.body}>
              <Text style={styles.text}>
                Yo {props.data.name}, con domicilio en, "CITY" distrito
                "DISTRIT" cantón "CANTON", provincia "STATE", con documento de
                identidad No.
                {props.data.idNumber}
              </Text>
              <Text>
                Solicito, a travé de la pressente decclaración jurada, la
                exoneracion de bienes inmuebles, declarando bajo fe de juramento
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
                Firmo en {props.data.address}, a las {hours}:{mins} horas del{" "}
                {day} del mes {month} del {year}
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
            <View style={styles.image}>
              <Image src={logo} />
            </View>
            <View style={styles.title}>
              <Text>Comprobantte de trámite de exoneración de bien único</Text>
            </View>
          </Page>
        </Document>
      );
      break;
  }

  let file = await pdf(MyDoc).toBlob();

  return await getBase64(file);
  


}
