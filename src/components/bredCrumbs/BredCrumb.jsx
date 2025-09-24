import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const BreadcrumbNav = ({ items }) => {
  console.log(items);

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {items.map((item, index) =>
          item.href ? (
            <Link
              key={index}
              underline="hover"
              color="inherit"
              href={item.href}
              onClick={item.onClick}
            >
              {item.label}
            </Link>
          ) : (
            <Typography key={index} color="text.primary">
              {item.label}
            </Typography>
          )
        )}
      </Breadcrumbs>
    </Stack>
  );
};

export default BreadcrumbNav;
