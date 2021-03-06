import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { removeDebugNodeFromIndex } from '@angular/core/src/debug/debug_node';

/**
 * Singleton service
 */
@Injectable({
  providedIn: 'root'
})

export class SocketService {
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io.connect();
    this.init();
  }

  /**
   * Socket events to client.
   */
  private init() {
    console.log('initializing sockets');
    this.socket.on('connect', (msg: any) => {
      console.log('socket connected to server');
    })
  }

  onNewGameCreated() {
    return new Observable<any>(observer => {
      this.socket.on('new-game-created', (msg: any) => {
        // console.log('new game created...');
        observer.next(msg);
      })
    })
  }

  onGameJoined() {
    return new Observable<any>(observer => {
      this.socket.on('player-joined-game', (msg: any) => {
        // console.log('new game created...');
        observer.next(msg);
      })
    })
  }

  onPlayerSelected() {
    return new Observable<any>(observer => {
      this.socket.on('player-selected', (msg: any) => {
        // console.log('player selected...');
        observer.next(msg);
      })
    })
  }

  onStartGame() {
    return new Observable<any>(observer => {
      this.socket.on('start-game', (msg: any) => {
        // console.log('player selected...');
        observer.next(msg);
      })
    })
  }

  onGetLegalMovesResponse() {
    return new Observable<any>(observer => {
      this.socket.on('get-legal-moves-response', (msg: any) => {
        observer.next(msg);
      })
    })
  }

  onPlayerMoved() {
    return new Observable<any>(observer => {
      this.socket.on('player-moved', (msg: any) => {
        observer.next(msg);
      })
    })
  }

  onSuggestionMade() {
    return new Observable<any>(observer => {
      this.socket.on('suggestion-made', (msg: any) => {
        observer.next(msg);
      })
    })
  }

  onNextPlayerUp() {
    return new Observable<any>(observer => {
      this.socket.on('next-player-up', (msg: any) => {
        observer.next(msg);
      })
    })
  }

  onAccusationMade() {
    return new Observable<any>(observer => {
      this.socket.on('accusation-made', (msg: any) => {
        observer.next(msg);
      })
    })
  }

  onRequestOfferClue() {
    return new Observable<any>(observer => {
      this.socket.on('request-offer-clue', (msg: any) => {
        observer.next(msg);
      })
    })
  }

  onClueOffered() {
    return new Observable<any>(observer => {
      this.socket.on('clue-offered', (msg: any) => {
        observer.next(msg);
      })
    })
  }

  onClueOfferRejected() {
    return new Observable<any>(observer => {
      this.socket.on('clue-offer-rejected', (msg: any) => {
        observer.next(msg);
      })
    })
  }


  /**
   * Socket events to server.
   */
  
  choosePlayer(roomId: string, name: string, player: string) {
    const message = {
      roomId: roomId,
      name: name,
      piece: player
    }
    this.socket.emit('select-player', message);
  }

  createGame(name: string, numPlayers: number) {
    const message = {
      name: name,
      numPlayers: numPlayers
    }

    this.socket.emit('create-game', message);
  }

  joinGame(name: string, roomId: string) {
    const message = {
      roomId: roomId,
      name: name
    }

    this.socket.emit('player-join-game', message);
  }

  getLegalMoves(roomId: string, location: string) {
    const message = {
      roomId: roomId,
      location: location
    }

    this.socket.emit('get-legal-moves', message);
  }

  movePlayer(roomId: string, piece: string, location: string) {
    const message = {
      roomId: roomId,
      piece: piece,
      location: location
    }

    this.socket.emit('move-player', message);
  }

  makeSuggestion(roomId: string, piece: string, player: string, weapon: string, room: string) {
    const message = {
      roomId: roomId,
      piece: piece,
      player: player,
      weapon: weapon,
      room: room
    }

    this.socket.emit('make-suggestion', message);
  }

  makeAccusation(roomId: string, piece: string, player: string, weapon: string, room: string) {
    const message = {
      roomId: roomId,
      piece: piece,
      player: player,
      weapon: weapon,
      room: room
    }

    this.socket.emit('make-accusation', message);
  }

  endTurn(roomId: string, piece: string) {
    const message = {
      roomId: roomId,
      piece: piece
    }

    this.socket.emit('end-turn', message);
  }

  getClueFromPlayer(roomId: string, requestingPlayerSocketId: string, requestedPlayerSocketId: string) {
    const message = {
      roomId: roomId,
      requestingPlayerSocketId: requestingPlayerSocketId,
      requestedPlayerSocketId: requestedPlayerSocketId
    }

    this.socket.emit('get-clue-from-player', message);
  }

  offerClue(requestingPlayerSocketId: string, requestedPlayerSocketId: string, card: string) {
    const message = {
      requestingPlayerSocketId: requestingPlayerSocketId,
      requestedPlayerSocketId: requestedPlayerSocketId,
      card: card
    }

    this.socket.emit('offer-clue', message);
  }

  rejectOfferClue(requestingPlayerSocketId: string, requestedPlayerSocketId: string) {
    const message = {
      requestingPlayerSocketId: requestingPlayerSocketId,
      requestedPlayerSocketId: requestedPlayerSocketId
    }

    this.socket.emit('reject-offer-clue', message);
  }
}
