import {StackNavigator, TabNavigator} from 'react-navigation'
import PromoScreen from './screens/PromoScreen'
import MapScreen from './screens/MapScreen'
import RouteScreen from './screens/RouteScreen'

const AppNavigator = StackNavigator({
    map: {
        screen: MapScreen
    },
    promo: {
        screen: PromoScreen
    },
    route: {
        screen: RouteScreen
    }
})


export default AppNavigator