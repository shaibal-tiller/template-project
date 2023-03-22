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
    id: 3,
    name: 'ACCNLDP',
    sub: 'Adaptation to Climate Change into the National and Local Development Planning Phase-II',
    description: 'Adaptation to Climate Change into the National and Local Development Planning Phase-II' ,
    fund: "German Federal Ministry for Economic Cooperation and Development (BMZ) & GoB",
    location: ["Shatkhira", "Khulna"],
    acLayers: ["tiller", "tiller1"],
}
const PKCP = {
    id: 2,
    name: 'PKCP',
    sub: 'Preparation of Payra-Kuakata Comprehensive Plan Focusing on Eco-Tourism (PKCP)- Package 02 & Package 03',
    description: 'Preparation of Payra-Kuakata Comprehensive Plan Focusing on Eco-Tourism (PKCP)- Package 02 & Package 03',
    fund: "Government of Bangladesh (GoB)",
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
//    accnldp: createProject(ACCNLDP),
    pkcp: createProject(PKCP),
}