import Link from "next/link";
import Divider from "@material-ui/core/Divider";
import MuiLink from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import useTheme from "@material-ui/core/styles/useTheme";
import { LinkObject } from "../navigation.config";

type Props = {
  linksList: LinkObject[];
  hasDivider: boolean;
  pathname: string;
  mobileClose: Function;
};

export default function DrawerList({ linksList, hasDivider = false, pathname, mobileClose }: Props) {
  const theme = useTheme();

  const handleClick = () => {
    const innerWidth = window?.innerWidth;
    if (innerWidth <= theme.breakpoints.values.sm) {
      mobileClose();
    }
  };

  return (
    <>
      {hasDivider && <Divider />}
      <List>
        {linksList.map(({ id, displayText, href, Icon }) => (
          <Link key={id} href={href} passHref>
            <MuiLink color="inherit" underline="none">
              <ListItem button selected={pathname === href} disabled={pathname === href} onClick={handleClick}>
                {Icon && (
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                )}
                <ListItemText primary={displayText} />
              </ListItem>
            </MuiLink>
          </Link>
        ))}
      </List>
    </>
  );
}
