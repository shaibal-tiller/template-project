const CRISC = {
    id: 1,
    name: 'CRISC',
    sub: 'Climate Resilient Inclusive Smart Cities',
    description: 'The planning of selected cities for urban development, including corresponding investment projects now takes into account the local adaptation needs for the cosequences of climate change.',
    fund: "Gesellschaft für Internationale Zusammenarbeit(GIZ)",
    location: ["sirajganj", "satkhira"]
}
const ACCNLDP = {
    id: 2,
    name: 'ACCNLDP',
    sub: 'Adaptation to Climate Change into the National and Local Development Planning II',
    description: 'ladjabd aduabda dau idbabd yuvadv a dauyv dyvadv aydvua vd adiabdv baubd audbaud' +
        +' add dadna dnai dnaoidna oid naoid aodnd aind aodn ianda dadiabd',
    fund: "jnjand abdjabjd abdjabdabd ajbdjbadbjab",
    location: ["Shatkhira", "Khulna"]
}
const PKCP = {
    id: 3,
    name: 'PKCP',
    sub: 'Payra-Kuakata Comprehensive Plan',
    description: 'ladjabd aduabda dauid babdy uvadv a dau yvdyv  advaydv avd adiabd vbaubd audb aud' +
        +' addda dnadnaid naoidnao idnaoid aodndaind aodn ianda dadiabd',
    fund: "jnjand abdjabjd abdjabdabd ajbdjbadbjab",
    location: ["shirajganj", "shatkhira"]
}
var count = 0;
const createProject = ({ id, name, sub = "", description, fund, location }) => {
    count += 1;
    return {
        id,
        name,
        sub,
        description,
        fund,
        location,
    }
}

export default {
    crisc: createProject(CRISC),
    accnldp: createProject(ACCNLDP),
    pkcp: createProject(PKCP),
}