import { useState } from 'react';
import useLogin from '../../hooks/useLogin';
import { useContext } from 'react';
import { LoginModalContext } from '../../contexts/LoginModalContext';
import { RegisterModalContext } from '../../contexts/RegisterModalContext';
import RegisterUser from './RegisterUser';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login } = useLogin();
  const [loginModalIsOpen, setLoginModalIsOpen] = useContext(LoginModalContext);
  const [registerModalIsOpen, setRegisterModalIsOpen] = useContext(RegisterModalContext);

  function clickLogin(e) {
    e.preventDefault();
    login(formData);
  }

  return (
    <>
      <div className="container position-absolute top-50 start-50 translate-middle z-10">
        <div
          className="modal-dialog modal-dialog-centered"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
        >
          <div className="modal-dialog modal-dialog-centered bg-white border p-1" role="document">
            <div className="modal-content ">
              <div className="d-flex justify-content-end ">
                <button
                  type="button"
                  className="close btn"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={closeButton}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-header d-flex justify-content-between border-bottom ms-4 me-4">
                <div className="me-5">
                  <h5 className="modal-title fs-6 fw-normal" id="exampleModalLongTitle">
                    Bejelentkezés
                  </h5>
                </div>
                <div className="ms-5 fs-6">
                  <button className="fw-light p-0 border-0 bg-white" onClick={registerButton}>
                    Új felhasználó
                  </button>
                </div>
              </div>
              <div className="modal-body mt-4 ms-4 me-4">
                <form onSubmit={clickLogin}>
                  <div className="mb-1">
                    <label htmlFor="email" className="form-label d-flex m-0">
                      E-mail
                    </label>
                    <input
                      type="email"
                      className="form-control rounded-0"
                      id="email"
                      placeholder=""
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label d-flex m-0">
                      Jelszó
                    </label>
                    <input
                      type="password"
                      className="form-control rounded-0"
                      id="password"
                      placeholder=""
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                  <div className="d-flex flex-column bd-highlight mt-4 mb-3">
                    <button
                      type="submit"
                      className="btn btn-dark p-2 bd-highlight btn-lg rounded-0 fs-6"
                      data-dismiss="modal"
                    >
                      BEJELENTKEZÉS
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {registerModalIsOpen && <RegisterUser />}
    </>
  );

  function closeButton() {
    setLoginModalIsOpen(false);
  }

  function registerButton() {
    setRegisterModalIsOpen(true);
    setLoginModalIsOpen(false);
  }
}
