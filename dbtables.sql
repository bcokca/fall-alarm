-- This table stores the information of the contact nurse and the hospital associated to it
CREATE TABLE NURSES
( Nurse_Id                       NUMBER(10)                                                                     -- Technical identifier associated to each Nurse
, First_Name                     VARCHAR2(50)               NOT NULL                                            -- First Name of the Nurse
, Last_Name                      VARCHAR2(50)               NOT NULL                                            -- Last Name of the Nurse
, Middle_Initial                 VARCHAR2(1)                                                                    -- Middle Initial of the Nurse
, Hospital_Name                  VARCHAR2(250)              NOT NULL                                            -- Hospital associated to each Nurse
, Contact_No                     VARCHAR2(50)               NOT NULL                                            -- Contact Number of the Nurse
, Address                        VARCHAR2(500)              NOT NULL                                            -- Address of the Nurse
, Email_Id                       VARCHAR2(100)              NOT NULL                                            -- Email ID of the Nurse
, Created_By                     VARCHAR2(30)               NOT NULL                                            -- Audit Columns
, Created_Date                   DATE                       NOT NULL                                            -- Audit Columns
, Modified_By                    VARCHAR2(30)               NOT NULL                                            -- Audit Columns
, Modified_Date                  DATE                       NOT NULL                                            -- Audit Columns
);

ALTER TABLE NURSES ADD CONSTRAINT NURSES_PK PRIMARY KEY (Nurse_Id);


-- This table stores the information of the Roles 
CREATE TABLE ROLES
( Role_Id                        NUMBER(10)                                                                     -- Technical identifier associated to each role
, Description                    VARCHAR2(50)               NOT NULL                                            -- Description of the role
, Created_By                     VARCHAR2(30)               NOT NULL                                            -- Audit Columns
, Created_Date                   DATE                       NOT NULL                                            -- Audit Columns
, Modified_By                    VARCHAR2(30)               NOT NULL                                            -- Audit Columns
, Modified_Date                  DATE                       NOT NULL                                            -- Audit Columns
);

ALTER TABLE ROLES ADD CONSTRAINT ROLES_PK PRIMARY KEY (Role_Id);

-- This table stores the information of the Users
CREATE TABLE USERS
( User_Id                        NUMBER(10)                                                                     -- Technical identifier associated to each User
, User_Name                      VARCHAR2(50)               NOT NULL                                            -- User Name used to login to the application
, Password                       VARCHAR2(50)               NOT NULL                                            -- Password for User Name
, Email_Id                       VARCHAR2(100)              NOT NULL                                            -- Email Id of User
, Role_Id                        NUMBER(10)                 NOT NULL                                            -- Technical identifier of the Role associated to the User
, Nurse_Id                       NUMBER(10)                 NOT NULL                                            -- Technical identifier of the Nurse associated to the User
, Created_By                     VARCHAR2(30)               NOT NULL                                            -- Audit Columns
, Created_Date                   DATE                       NOT NULL                                            -- Audit Columns
, Modified_By                    VARCHAR2(30)               NOT NULL                                            -- Audit Columns
, Modified_Date                  DATE                       NOT NULL                                            -- Audit Columns
);

ALTER TABLE USERS ADD CONSTRAINT USERS_PK PRIMARY KEY (Role_Id);
ALTER TABLE USERS ADD CONSTRAINT USERS_FK1 FOREIGN KEY (Role_Id) REFERENCES ROLES (Role_Id);
ALTER TABLE USERS ADD CONSTRAINT USERS_FK2 FOREIGN KEY (Nurse_Id) REFERENCES NURSES (Nurse_Id);

-- This table stores the information of the Device
CREATE TABLE DEVICES
( Device_Id                      NUMBER(10)                                                                     -- Technical identifier associated to each Device
, Model                          VARCHAR2(50)               NOT NULL                                            -- Model of the device
, Make                           VARCHAR2(50)               NOT NULL                                            -- Make of the deviceLast Name of the Nurse
, Register_Date                  DATE                       NOT NULL                                            -- Device registered date
, Is_Active                      VARCHAR2(1)    DEFAULT 'Y' NOT NULL CHECK (Is_Active IN ('Y','N'))             -- Device is active in the system flag
, Created_By                     VARCHAR2(30)               NOT NULL                                            -- Audit Columns
, Created_Date                   DATE                       NOT NULL                                            -- Audit Columns
, Modified_By                    VARCHAR2(30)               NOT NULL                                            -- Audit Columns
, Modified_Date                  DATE                       NOT NULL                                            -- Audit Columns
);

ALTER TABLE DEVICES ADD CONSTRAINT DEVICES_PK PRIMARY KEY (Device_Id);


-- This table stores the information of the Patients
CREATE TABLE PATIENTS
( Patient_Id                     NUMBER(10)                                                                     -- Technical identifier associated to each Patient
, First_Name                     VARCHAR2(50)               NOT NULL                                            -- First Name of the Patient
, Last_Name                      VARCHAR2(50)               NOT NULL                                            -- Last Name of the Patient
, Middle_Initial                 VARCHAR2(1)                                                                    -- Middle Initial of the Patient
, DOB                            DATE                       NOT NULL                                            -- Date of birth of the Patient
, Contact_No                     VARCHAR2(50)               NOT NULL                                            -- Contact Number of the Patient
, Address                        VARCHAR2(500)              NOT NULL                                            -- Address of the Patient
, Email_Id                       VARCHAR2(100)              NOT NULL                                            -- Email ID of the Patient
, Nurse_Id                       NUMBER(10)                 NOT NULL                                            -- Technical identifier of the Nurse associated to the Patient
, Device_Id                      NUMBER(10)                 NOT NULL                                            -- Technical identifier of the Device associated to the Patient
, Register_Date                  DATE                       NOT NULL                                            -- Device registered date
, Is_Active                      VARCHAR2(1)    DEFAULT 'Y' NOT NULL CHECK (Is_Active IN ('Y','N'))             -- Patient is active in the system flag
, Last_Alert_Date                DATE                                                                           -- Last Alert Date 
, Last_Alert_Note                VARCHAR2(250)                                                                  -- Last Alert Notes 
, Last_Alert_Status              VARCHAR2(1)    DEFAULT 'I' NOT NULL CHECK (Last_Alert_Status IN ('I','c','A')) -- Last Alert Satus - Ignore (I), Close (C), Alert (A)  
, Created_By                     VARCHAR2(30)               NOT NULL                                            -- Audit Columns
, Created_Date                   DATE                       NOT NULL                                            -- Audit Columns
, Modified_By                    VARCHAR2(30)               NOT NULL                                            -- Audit Columns
, Modified_Date                  DATE                       NOT NULL                                            -- Audit Columns
);

ALTER TABLE PATIENTS ADD CONSTRAINT PATIENTS_PK  PRIMARY KEY (Patient_Id);
ALTER TABLE PATIENTS ADD CONSTRAINT PATIENTS_FK1 FOREIGN KEY (Device_Id) REFERENCES DEVICES (Device_Id);
ALTER TABLE PATIENTS ADD CONSTRAINT PATIENTS_FK2 FOREIGN KEY (Nurse_Id) REFERENCES NURSES (Nurse_Id);


-- This table stores the information of the Patient alert history
CREATE TABLE PATIENT_ALERT_HIST
( Alert_Id                       NUMBER(10)                                                                     -- Technical identifier associated to each Alert
, Patient_Id                     NUMBER(10)                 NOT NULL                                            -- Technical identifier of the Patient associated to the Alert
, Nurse_Id                       NUMBER(10)                 NOT NULL                                            -- Technical identifier of the Nurse associated to the Alert
, Device_Id                      NUMBER(10)                 NOT NULL                                            -- Technical identifier of the Device associated to the Alert
, Last_Alert_Date                DATE                       NOT NULL                                            -- Alert Date 
, Last_Alert_Note                VARCHAR2(250)                                                                  -- Alert Notea 
, Last_Alert_Status              VARCHAR2(1)    DEFAULT 'I' NOT NULL CHECK (Last_Alert_Status IN ('I','c','A')) -- Alert Satus - Ignore (I), Close (C), Alert (A) 
, Created_By                     VARCHAR2(30)               NOT NULL                                            -- Audit Columns
, Created_Date                   DATE                       NOT NULL                                            -- Audit Columns
, Modified_By                    VARCHAR2(30)               NOT NULL                                            -- Audit Columns
, Modified_Date                  DATE                       NOT NULL                                            -- Audit Columns
);


ALTER TABLE PATIENT_ALERT_HIST ADD CONSTRAINT PATIENT_ALERT_HIST_PK  PRIMARY KEY (Alert_Id);
ALTER TABLE PATIENT_ALERT_HIST ADD CONSTRAINT PATIENT_ALERT_HIST_FK1 FOREIGN KEY (Patient_Id) REFERENCES PATIENTS (Patient_Id);
ALTER TABLE PATIENT_ALERT_HIST ADD CONSTRAINT PATIENT_ALERT_HIST_FK2 FOREIGN KEY (Device_Id) REFERENCES DEVICES (Device_Id);
ALTER TABLE PATIENT_ALERT_HIST ADD CONSTRAINT PATIENT_ALERT_HIST_FK3 FOREIGN KEY (Nurse_Id) REFERENCES NURSES (Nurse_Id);
