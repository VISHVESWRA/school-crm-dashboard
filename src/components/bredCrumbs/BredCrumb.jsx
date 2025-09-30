import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Button } from "react-bootstrap";

const BreadcrumbNav = ({ items, sideNavButtons }) => {
  return (
    <div className="flex justify-between items-center space-x-2 text-sm p-3 bg-white border-t-2 border-gray-300">
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


      {sideNavButtons && (
        <div>
          {sideNavButtons.map((btn, i) => (
            // <Button
            //   label={btn.label}
            //   key={i}
            //   onClick={btn.onClick}
            //   rounded
            //   className={`m-2 bg-[#C72571] border-0 hover:bg-[#8B0F4B] text-white font-semibold px-4 py-2 text-sm`}
            //   style={{ borderRadius: "20px" }}
            // />
            <Button
              key={i}
              onClick={btn.onClick}
              className="mx-1 px-4 py-2 text-sm font-semibold text-white"
              style={{
                backgroundColor: "#C72571",
                borderRadius: "20px",
                border: "none",
              }}
            >
              {btn.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BreadcrumbNav;

{/* {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex justify-between items-center p-3 bg-white border-t-2 border-gray-300">
            <BreadcrumbNav items={breadcrumbs} />

            {sideNavButtons && (
              <div>
                {sideNavButtons.map((btn, i) => (
                  // <Button
                  //   label={btn.label}
                  //   key={i}
                  //   onClick={btn.onClick}
                  //   rounded
                  //   className={`m-2 bg-[#C72571] border-0 hover:bg-[#8B0F4B] text-white font-semibold px-4 py-2 text-sm`}
                  //   style={{ borderRadius: "20px" }}
                  // />
                  <Button
                    key={i}
                    onClick={btn.onClick}
                    className="mx-1 px-4 py-2 text-sm font-semibold text-white"
                    style={{
                      backgroundColor: "#C72571",
                      borderRadius: "20px",
                      border: "none",
                    }}
                  >
                    {btn.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )} */}
