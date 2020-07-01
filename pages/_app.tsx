/* eslint react/jsx-props-no-spreading: 0 */
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Drawer from "../components/Navigation/Drawer";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <div>
      <Drawer router={router} />
      <Component {...pageProps} />;
    </div>
  );
}
