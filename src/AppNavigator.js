import {StackNavigator, TabNavigator} from 'react-navigation'
import PromoScreen from './screens/PromoScreen'
import MapScreen from './screens/MapScreen'
import RouteScreen from './screens/RouteScreen'

const AppNavigator = StackNavigator({
    promo: {
        screen: PromoScreen
    },
    map: {
        screen: MapScreen
    },
    route: {
        screen: RouteScreen
    }
})


export default AppNavigator