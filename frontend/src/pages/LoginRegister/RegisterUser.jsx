import { useState } from 'react';
import userService from '../../services/user-service';
import { useContext } from 'react';
import { LoginModalContext } from '../../contexts/LoginModalContext';
import { RegisterModalContext } from '../../contexts/RegisterModalContext';

export default function RegisterUser() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  function register(e) {
    e.preventDefault();
    userService.register(formData).then((resp) => setMessage(resp.data.message));
  }
  const [registerModalIsOpen, setRegisterModalIsOpen] = useContext(RegisterModalContext);
  const [loginModalIsOpen, setLoginModalIsOpen] = useContext(LoginModalContext);
  return (
    <>
      <div className="container position-absolute top-50 start-50 translate-middle z-2">
        <div
          className="modal-dialog modal-dialog-centered"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="example-ModalCenterTitle"
        >
          <div className="modal-dialog modal-dialog-centered bg-white border p-1" role="document">
            <div className="modal-content ">
              <div className="d-flex justify-content-end ">
                <button
                  type="button"
                  className="close btn"
                  data-dismiss="modal"
                  aria-label="close"
                  onClick={closeButton}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-header d-flex justify-content-between border-bottom ms-4 me-4">
                <div className="me-5">
                  <button
                    className="fw-light p-0 border-0 bg-white"
                    id="example-ModalLongTitle"
                    onClick={loginButton}
                  >
                    Bejelentkezés
                  </button>
                </div>
                <div className="ms-5 fs-6">
                  <h5 className="modal-title  fs-6 fw-normal">Új felhasználó</h5>
                </div>
              </div>
              <div className="modal-body mt-4 ms-4 me-4">
                <form>
                  <div className="mb-1">
                    <label htmlFor="Email" className="form-label d-flex m-0">
                      E-mail
                    </label>
                    <input
                      type="email"
                      className="form-control rounded-0"
                      id="Email"
                      placeholder=""
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Password" className="form-label d-flex m-0">
                      Jelszó
                    </label>
                    <input
                      type="password"
                      className="form-control rounded-0"
                      id="Password"
                      placeholder=""
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                  <div className="d-flex flex-column bd-highlight mt-4 mb-3">
                    <button
                      type="submit"
                      onClick={register}
                      className="btn btn-dark p-2 bd-highlight btn-lg rounded-0 fs-6"
                      data-dismiss="modal"
                    >
                      REGISZTRÁCIÓ
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  function closeButton() {
    setRegisterModalIsOpen(false);
  }
  function loginButton() {
    setLoginModalIsOpen(true);
    setRegisterModalIsOpen(false);
  }
}
