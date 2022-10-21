import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

//TODO: add right types here
// @ts-ignore
const BootstrapTooltip = styled(({ className, ...props }) => (
  //TODO: add right types here
  // @ts-ignore
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#333",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#333",
    color: "#fafafa",
    fontWeight: "600",
  },
}));

export default function PopOver({ icon, text }) {
  return (
    <div>
      {/*
          //TODO: add right types here
          // @ts-ignore */}
      <BootstrapTooltip title={text}>
        <span>{icon}</span>
      </BootstrapTooltip>
    </div>
  );
}
