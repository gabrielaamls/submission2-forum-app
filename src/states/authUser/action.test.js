/**
 * skenario test
 * 
 * - asyncSetAuthUser thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 * 
 * - asyncUnsetAuthUser thunk
 *  - should dispatch action correctly when data fetching success
 */

import { describe, beforeEach, afterEach, it, vi, expect, } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncSetAuthUser, asyncUnsetAuthUser, setAuthUserActionCreator, unsetAuthUserActionCreator } from './action';

const payloadLogin = { 
  email: 'email@example.com', 
  password: 'secret' 
}

const fakeAccessToken = "random-token";

const fakeUserResponse = {
  "id": "john_doe",
  "name": "John Doe",
  "email": "john@example.com",
  "avatar": "https://generated-image-url.jpg"
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    api._login = api.login;
    api._putAccessToken = api.putAccessToken;
    api._getOwnProfile = api.getOwnProfile;
  });
 
  afterEach(() => {
    api.login = api._login;
    api.putAccessToken = api._putAccessToken;
    api.getOwnProfile = api._getOwnProfile;
 
    // delete backup data
    delete api._login;
    delete api._putAccessToken;
    delete api._getOwnProfile;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.resolve(fakeAccessToken);
    api.putAccessToken = vi.fn();
    api.getOwnProfile = () => Promise.resolve(fakeUserResponse);
    // mock dispatch
    const dispatch = vi.fn();
 
    // action
    await asyncSetAuthUser(payloadLogin)(dispatch);
 
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUserResponse));
  });


  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.reject(fakeErrorResponse);
    api.putAccessToken = vi.fn();
    api.getOwnProfile = () => Promise.resolve(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // mock alert
    window.alert = vi.fn();
 
    // action
    await asyncSetAuthUser(payloadLogin)(dispatch);
 
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncUnsetAuthUser thunk', () => {
  beforeEach(() => {
    api._putAccessToken = api.putAccessToken;
  });
 
  afterEach(() => {
    api.putAccessToken = api._putAccessToken;
 
    // delete backup data
    delete api._putAccessToken;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.putAccessToken = vi.fn();
    // mock dispatch
    const dispatch = vi.fn();
 
    // action
    await asyncUnsetAuthUser()(dispatch);
 
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
  });
});

