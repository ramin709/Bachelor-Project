import {
    MdBalcony, MdWifi, MdOutlineWaves, MdOutlineSafetyDivider, MdBathtub, MdIron, MdFitnessCenter,
    MdMonitor, MdOutlinePets, MdKitchen, MdVolumeOff
} from 'react-icons/md'
import { GiShower, GiTeapot, GiWoodBeam, GiBugNet, GiElectricalSocket } from 'react-icons/gi'
import { IoMdSnow } from 'react-icons/io'
import { FaGlassCheers, FaSwimmer, FaMountain, FaWind } from 'react-icons/fa'

const Icon = ({item}) => {
    const map1 = new Map([
        ['Air Conditioning', IoMdSnow],
        ['Balcony', MdBalcony],
        ["Free Wifi", MdWifi],
        ['Sea View', MdOutlineWaves],
        ['Mountain View', FaMountain],
        ['Private Bathroom', GiShower],
        ['Safe', MdOutlineSafetyDivider],
        ['Bath Tub', MdBathtub],
        ['Electric Kettle', GiTeapot],
        ['Hairdryer', FaWind],
        ['Hardwood Floor', GiWoodBeam],
        ['Iron', MdIron],
        ['Minibar', FaGlassCheers],
        ['Mosquito Net', GiBugNet],
        ['Pets Allowed', MdOutlinePets],
        ['Private Kitchenette', MdKitchen],
        ['Public Fitness Centre', MdFitnessCenter],
        ['Public Swimming Pool', FaSwimmer],
        ['Socket near the bed', GiElectricalSocket],
        ['Sound Proof', MdVolumeOff],
        ["TV", MdMonitor]
    ]);

    const selectedIcon = map1.get(item)

    return selectedIcon ? selectedIcon() : null
}

export default Icon