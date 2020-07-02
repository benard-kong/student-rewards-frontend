import Link from "next/link";
import Divider from "@material-ui/core/Divider";
import MuiLink from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useTheme, withStyles } from "@material-ui/core/styles";
import { LinkObject } from "../navigation.config";

const StyledListItem = withStyles({
  disabled: {
    opacity: "1 !important", // Not able to override defaults without !important?
  },
  selected: {
    "background-color": "rgba(0, 0, 0, 0.3) !important",
  },
})(ListItem);

type Props = {
  hasDivider: boolean;
  linksList: LinkObject[];
  mobileClose: Function;
  pathname: string;
};

export default function DrawerList({ hasDivider = false, linksList, mobileClose, pathname }: Props) {
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
              <StyledListItem button disabled={pathname === href} onClick={handleClick} selected={pathname === href}>
                {Icon && (
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                )}
                <ListItemText primary={displayText} />
              </StyledListItem>
            </MuiLink>
          </Link>
        ))}
      </List>
    </>
  );
}
