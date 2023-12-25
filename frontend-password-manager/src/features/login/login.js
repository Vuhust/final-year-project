import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginRequest } from '../../actions/authActions';

const Login = ({ login, loading, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Basic validation - you may want to implement more robust validation
    if (username && password) {
      login(username, password);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(loginRequest(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
