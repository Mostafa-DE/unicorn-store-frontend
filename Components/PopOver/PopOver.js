import {styled} from '@mui/material/styles';
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';


const BootstrapTooltip = styled(({className, ...props}) => (
    <Tooltip {...props} arrow
             classes={{popper: className}}
    />
))(({theme}) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: "#333"
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#333",
        color: "#fafafa",
        fontWeight: "600"
    },
}));


export default function PopOver({icon, text}) {
    return (
        <div>
            <BootstrapTooltip title={text}>
                <span>{icon}</span>
            </BootstrapTooltip>
        </div>
    );
}