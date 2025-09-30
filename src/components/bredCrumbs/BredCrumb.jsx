import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const BreadcrumbNav = ({ items }) => {
  return (
    <div className="space-x-2 text-sm p-3 bg-white border-t-2 border-gray-300">
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
    </div>
  );
};

export default BreadcrumbNav;
