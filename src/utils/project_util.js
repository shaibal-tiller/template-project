const CRISC = {
    id: 1,
    name: 'CRISC',
    sub:'Climate Resilient Inclusive Smart Cities',
    description: 'ladjabd aduabda dau idbabd yu vadva dauyvdyvad vaydvu avd adiab dvbaubd au dbaud' +
        +' adddad nadna idnao idna oidna oid aodnd aind aodn ianda dadiabd',
    fund: "jnjand abdjabjd abdjabdabd ajbdjbadbjab",
    location: ["Shirajganj", "Shatkhira"]
}
const ACCNLDP = {
    id: 2,
    name: 'ACCNLDP',
    sub:'Adaptation to Climate Change into the National and Local Development Planning II',
    description: 'ladjabd aduabda dau idbabd yuvadv a dauyv dyvadv aydvua vd adiabdv baubd audbaud' +
        +' add dadna dnai dnaoidna oid naoid aodnd aind aodn ianda dadiabd',
    fund: "jnjand abdjabjd abdjabdabd ajbdjbadbjab",
    location: ["Shirajganj", "Shatkhira"]
}
const PKCP = {
    id: 3,
    name: 'PKCP',
    sub:'Payra-Kuakata Comprehensive Plan',
    description: 'ladjabd aduabda dauid babdy uvadv a dau yvdyv  advaydv avd adiabd vbaubd audb aud' +
        +' addda dnadnaid naoidnao idnaoid aodndaind aodn ianda dadiabd',
    fund: "jnjand abdjabjd abdjabdabd ajbdjbadbjab",
    location: ["Shirajganj", "Shatkhira"]
}
var count = 0;
const createProject = ({ id, name,sub="", description, fund, location }) => {
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