const CRISC = {
    id: 1,
    name: 'CRISC',
    sub: 'Climate Resilient Inclusive Smart Cities',
    description: 'The planning of selected cities for urban development, including corresponding investment projects now takes into account the local adaptation needs for the cosequences of climate change.',
    fund: 'Gesellschaft für Internationale Zusammenarbeit(GIZ)',
    location: ["sirajganj", "satkhira"],
    acLayers: [{ "facilities": `administrative, otherStructure, educationalInst, helthService, utilityWash, religiousPlace ` },
    { 'pf': `selectedArea, structureUse, otherStructure, floodWorks, waterBody, roadLine, roadPoly, drain` },
    { 'boundary': `` },
    { 'mejor': `` }],

}
const ACCNLDP = {
    id: 2,
    name: 'ACCNLDP',
    sub: 'Adaptation to Climate Change into the National and Local Development Planning II',
    description: 'ladjabd aduabda dau idbabd yuvadv a dauyv dyvadv aydvua vd adiabdv baubd audbaud' +
        +' add dadna dnai dnaoidna oid naoid aodnd aind aodn ianda dadiabd',
    fund: "jnjand abdjabjd abdjabdabd ajbdjbadbjab",
    location: ["Shatkhira", "Khulna"],
    acLayers: ["tiller", "tiller1"],
}
const PKCP = {
    id: 3,
    name: 'PKCP',
    sub: 'Payra-Kuakata Comprehensive Plan',
    description: 'ladjabd aduabda dauid babdy uvadv a dau yvdyv  advaydv avd adiabd vbaubd audb aud' +
        +' addda dnadnaid naoidnao idnaoid aodndaind aodn ianda dadiabd',
    fund: "jnjand abdjabjd abdjabdabd ajbdjbadbjab",
    location: ['pkcp'],
    acLayers: ["tiller", "tiller1"],
}
var count = 0;
const createProject = ({ id, name, sub = "", description, fund, location, acLayers }) => {
    count += 1;
    return {
        id,
        name,
        sub,
        description,
        fund,
        location,
        acLayers
    }
}

export default {
    crisc: createProject(CRISC),
    accnldp: createProject(ACCNLDP),
    pkcp: createProject(PKCP),
}