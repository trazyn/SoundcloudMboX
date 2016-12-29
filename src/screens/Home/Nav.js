
import React, { Component, PropTypes } from 'react';
import {
    ListView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import { GENRES_MAP } from '../../config';

export default class Nav extends Component {

    static propTypes = {
        genre: PropTypes.string.isRequired,
        changeGenre: PropTypes.func.isRequired,
    };

    render() {

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        const dataSource = ds.cloneWithRows(GENRES_MAP);

        return (
            <View style={styles.container}>

                <ListView

                showsHorizontalScrollIndicator={false}
                horizontal={true}

                decelerationRate={0}
                snapToInterval={width / 2}
                snapToAlignment='start'

                enableEmptySections={true}
                dataSource={dataSource}

                renderRow={genre => {

                    const active = genre === this.props.genre;

                    return (
                        <TouchableOpacity style={{
                            width: width / 2,
                            alignItems: 'center',
                            flex: 1,
                            alignItems: 'center',
                        }}
                        onPress={() => this.props.changeGenre(genre)}>
                            <Text style={[styles.genre, active && styles.genreActive]}>{genre.toUpperCase()}</Text>
                            <View style={[styles.indicator, active && styles.indicatorActive]}></View>
                        </TouchableOpacity>
                    );
                }}>
                </ListView>
            </View>
        );
    }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        flex: 1,
        top: 0,
        height: 100,
        width,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        zIndex: 9,
    },

    genre: {
        color: 'rgba(0,0,0,.4)',
        fontWeight: '100'
    },

    genreActive: {
        color: 'rgba(0,0,0,.8)',
    },

    indicator: {

        width: 14,
        marginTop: 8,
        borderBottomColor: 'transparent',
        borderBottomWidth: 1,
    },

    indicatorActive: {
        borderBottomColor: 'rgba(0,0,0,.8)',
    },
});
