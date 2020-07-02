/* eslint react/jsx-props-no-spreading: 0 */
import { AppProps } from "next/app";
import Drawer from "../components/Navigation/Drawer";

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return <Drawer router={router} Component={Component} pageProps={pageProps} />;
}
