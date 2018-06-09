import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const summer = (accumulator, currentValue) => accumulator + currentValue;

function ScoreInput(props) {
  return <TextInput
    textAlign="center"
    placeholder="0"
    keyboardType="numeric"
    underlineColorAndroid="transparent"
    {...props}
  />
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastRowId: 4,
      scores: []
    };
  }
  onChangeText(playerId, rowId, score) {
    const scores = this.state.scores.slice();
    const scoreId = playerId + '/' + rowId;
    scores[scoreId] = parseInt(score);
    this.setState({ scores });
    if (rowId == this.state.lastRowId) {
      this.setState({lastRowId: rowId + 1});
    }
  }
  createColumn(playerId) {
    const column = [];
    let result = 0;

    column.push(
      <Text
        key="player"
        style={{fontWeight: 'bold'}}>
        P{playerId + 1}
      </Text>
    );
    for (let currentRow = 0; currentRow <= this.state.lastRowId; currentRow++) {
      const currentResult = this.state.scores[playerId + '/' + currentRow];
      if (currentResult) {
        result += currentResult;
      }
      column.push(
        <ScoreInput
          key={currentRow}
          onChangeText={score => this.onChangeText(playerId, currentRow, score)}
        />
      );
    }
    column.push(
      <Text key="result" style={{fontWeight: 'bold'}}>{result}</Text>
    );
    return (<View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>{column}</View>);
  }
  render() {
    return (
      <View style={styles.container}>
        {this.createColumn(0)}
        {this.createColumn(1)}
        {this.createColumn(2)}
        {this.createColumn(3)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
