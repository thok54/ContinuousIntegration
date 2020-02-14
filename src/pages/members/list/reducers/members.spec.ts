import deepFreeze from 'deep-freeze';
import { Member } from '../../../../rest-api/model';
import { MembersAction } from '../actions';
import { actionIds } from '../actions/actionIds';
import { membersReducer, MembersState } from './members';

describe('members reducer specs', () => {
  it('should return the initial state if state is undefined', () => {
    // Arrange
    const initalState = undefined;
    const action = {
      type: 'something',
      payload: null,
    };

    // Act
    const result = membersReducer(initalState, action as MembersAction);

    // Assert
    expect(result.members).toEqual([]);
    expect(result.serverError).toBeNull();
  });

  it('should return the same state if action type is unknown', () => {
    // Arrange
    const initialState: MembersState = {
      members: [{avatar_url: 'avatar', id: 1, login: 'test login'}],
      serverError: null,
    };
    const action = {
      type: 'action type',
      payload: null,
    };

    deepFreeze(initialState);

    // Act
    const result = membersReducer(initialState, action as MembersAction);

    // Assert
    expect(result.members).toEqual(initialState.members);
    expect(result.serverError).toEqual(initialState.serverError);
  });


  it('should set members with the given payload when action type is FETCH_MEMBERS_SUCCESS', () => {
    // Arrange
    const initalState: MembersState = {
      members: [
        {avatar_url: 'avatar 1', id: 1, login: 'login 1'},
      ],
      serverError: null,
    };

    const members: Member[] = [
      {avatar_url: 'avatar 2', id: 2, login: 'login 2'},
    ];

    const action = {
      type: actionIds.FETCH_MEMBERS_SUCCESS,
      payload: members,
    }

    deepFreeze(initalState);

    // Act
    const result = membersReducer(initalState, action);

    // Assert
    expect(result.members).toEqual(action.payload);
  });


  it('should reset serverError to null when action type is FETCH_MEMBERS_SUCCESS', () => {
    // Arrange
    const initalState: MembersState = {
      members: [],
      serverError: 'Something went wrong',
    };

    const members: Member[] = [
      {avatar_url: 'avatar 2', id: 2, login: 'login 2'},
    ];

    const action = {
      type: actionIds.FETCH_MEMBERS_SUCCESS,
      payload: members,
    }

    deepFreeze(initalState);

    // Act
    const result = membersReducer(initalState, action);

    // Assert
    expect(result.serverError).toBeNull();
  });

  it('should set serverError with the given payload when action type is FETCH_MEMBERS_ERROR', () => {
    // Arrange
    const initialState: MembersState = {
      members: [],
      serverError: null
    };

    const action = {
      type: actionIds.FETCH_MEMBERS_ERROR,
      payload: 'Server error',
    }

    deepFreeze(initialState);

    // Act
    const result = membersReducer(initialState, action);

    // Assert
    expect(result.members).toEqual(initialState.members);
    expect(result.serverError).toEqual('Server error');
  });
});
