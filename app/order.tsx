"use client";
import React, { Fragment } from "react";
import dynamic from "next/dynamic";
import { OrderInput } from "./service";
import {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

import { displayForint, OrderItem, TotalItem } from "./service";

export const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

const logo = "./logo.png";
const today = Intl.DateTimeFormat("hu-HU", { dateStyle: "short" }).format(
  new Date(),
);

export const Order = ({ order }: { order: OrderInput }) => {
  const styles = StyleSheet.create({
    page: {
      fontSize: 11,
      paddingTop: 20,
      paddingLeft: 40,
      paddingRight: 40,
      lineHeight: 1.5,
      flexDirection: "column",
    },

    spaceBetween: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      color: "#3E3E3E",
    },

    titleContainer: { flexDirection: "row", marginTop: 24 },

    logo: { width: 120 },

    reportTitle: { fontSize: 16, textAlign: "center" },

    addressTitle: { fontSize: 11, fontStyle: "bold" },

    tripDetails: { fontSize: 11, marginLeft: 20 },

    invoice: { fontWeight: "bold", fontSize: 20 },

    invoiceNumber: { fontSize: 11, fontWeight: "bold" },

    address: { fontWeight: 400, fontSize: 10 },

    theader: {
      marginTop: 20,
      fontSize: 10,
      fontStyle: "bold",
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      height: 20,
      backgroundColor: "#DEDEDE",
      borderColor: "whitesmoke",
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },

    theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },

    tbody: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      borderColor: "whitesmoke",
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },

    rightAlign: { textAlign: "right" },

    total: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1.5,
      borderColor: "whitesmoke",
      borderBottomWidth: 1,
    },

    tbody2: { flex: 2, borderRightWidth: 1 },
  });

  const OrderTitle = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <Image src={logo} style={styles.logo} />
        <Text style={styles.reportTitle}>Ferzah Bt.</Text>
      </View>
    </View>
  );

  const Address = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View>
          <Text style={styles.invoice}>TESZT Árajánlat TESZT</Text>
        </View>
        <View>
          <Text style={styles.addressTitle}>
            1133 Budapest, Visegrádi utca 89/a
          </Text>
          <Text style={styles.addressTitle}>
            tel/fax: +36-1-344-1980 +36-20-926-25-22
          </Text>
          <Text style={styles.addressTitle}>e-mail: info@logobusz.hu</Text>
        </View>
      </View>
    </View>
  );

  const UserAddress = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View style={{ maxWidth: 200 }}>
          <Text style={styles.addressTitle}>Címzett: </Text>
          <Text style={styles.address}>{order.customerEmail}</Text>
        </View>
        <Text style={styles.addressTitle}>{today}</Text>
      </View>
    </View>
  );

  const TripHeader = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View>
          <Text>Kedves {order.customerName}!</Text>
        </View>
      </View>
    </View>
  );
  const TripDetails = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View>
          <Text>Köszönjük, hogy megkeresett minket ajánlatkérésével!</Text>
          <Text>Árajánlatunk az alábbi utazásra vonatkozik:</Text>
          <Text style={styles.tripDetails}>
            Utazás dátuma: {order.tripDate}
          </Text>
          <Text style={styles.tripDetails}>
            Indulás: {order.tripStartLocation}
          </Text>
          <Text style={styles.tripDetails}>Útvonal: {order.tripRoute}</Text>
          <Text style={styles.tripDetails}>
            Utazás idotartama: {`${order?.tripDuration?.value} ${order?.tripDuration?.displayMetric}`}
          </Text>
          <Text style={styles.tripDetails}>
            Utasok száma: {order.tripPassengers} fo
          </Text>
        </View>
      </View>
    </View>
  );

  const TableHead = () => (
    <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
      <View style={[styles.theader, styles.theader2]}>
        <Text>Díjtétel</Text>
      </View>
      <View style={[styles.theader, styles.rightAlign]}>
        <Text>Egységár</Text>
      </View>
      <View style={[styles.theader, styles.rightAlign]}>
        <Text>Mennyiség</Text>
      </View>
      <View style={[styles.theader, styles.rightAlign]}>
        <Text>Összeg</Text>
      </View>
    </View>
  );

  const TableBody = ({ item }: { item: OrderItem }) => (
    <Fragment key={item.id}>
      <View style={{ width: "100%", flexDirection: "row" }}>
        <View style={[styles.tbody, styles.tbody2]}>
          <Text>{item.description}</Text>
        </View>
        <View style={[styles.tbody, styles.rightAlign]}>
          <Text>{displayForint(item.price)} </Text>
        </View>
        <View style={[styles.tbody, styles.rightAlign]}>
          <Text>{item.quantity > 1 ? item.quantity : ""}</Text>
        </View>
        <View style={[styles.tbody, styles.rightAlign]}>
          <Text>{displayForint(item.price * item.quantity)}</Text>
        </View>
      </View>
    </Fragment>
  );

  const TableTotal = ({ item }: { item: TotalItem }) => (
    <Fragment key={item.id}>
      <View style={{ width: "100%", flexDirection: "row" }}>
        <View style={styles.total}>
          <Text />
        </View>
        <View style={styles.total}>
          <Text> </Text>
        </View>
        <View style={styles.tbody}>
          <Text>{item.description}</Text>
        </View>
        <View style={[styles.tbody, styles.rightAlign]}>
          <Text>{displayForint(item.amount)}</Text>
        </View>
      </View>
    </Fragment>
  );

  const OrderTerms = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View>
          <Text>
            Az ajánlatban található ár kedvezményes. Érvényes 7 naptári napig.
            Fizetésre igény szerint átutalással, vagy készpénzzel.
          </Text>
          <Text>Tisztelettel,</Text>
          <Text>Zahn András</Text>
        </View>
      </View>
    </View>
  );

  return (
    <Document
      author="Ferzah Bt."
      creator="logobusz.hu"
      producer="logobusz.hu"
      subject="Árajánlat"
      title="Árajánlat"
    >
      <Page size="A4" style={styles.page}>
        <OrderTitle />
        <Address />
        <UserAddress />
        <TripHeader />
        <TripDetails />
        <TableHead />
        {order.orderItems.map((item: OrderItem) => (<TableBody item={item} />))}
        {order.total.map((item: TotalItem) => (<TableTotal item={item} />))}
        <OrderTerms />
      </Page>
    </Document>
  );
};
