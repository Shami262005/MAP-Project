-- 1. ENUM TYPES (if you haven’t already)
CREATE TYPE team_category AS ENUM ('male','female');
CREATE TYPE gender        AS ENUM ('male','female');
CREATE TYPE team_league   AS ENUM ('junior league','first division','premier league');
CREATE TYPE event_type    AS ENUM ('league','friendly','practice','meeting');
CREATE TYPE user_role     AS ENUM ('admin','coach','player');

-- 2. TEAM (unchanged)
CREATE TABLE team (
  team_id      SERIAL PRIMARY KEY,
  team_name    VARCHAR(100)  NOT NULL UNIQUE,
  contact      VARCHAR(100)  NOT NULL,
  team_address VARCHAR(200),
  category     team_category NOT NULL,
  league       team_league   NOT NULL,
  logo_url     TEXT
);

-- 3. CENTRAL USERS TABLE
CREATE TABLE users (
  user_id      SERIAL PRIMARY KEY,
  first_name   VARCHAR(80)   NOT NULL,
  last_name    VARCHAR(80)   NOT NULL,
  phone        VARCHAR(50)   NOT NULL,
  username     VARCHAR(100)  UNIQUE,
  email        VARCHAR(200)  NOT NULL UNIQUE,
  password     TEXT,
  user_role    user_role     NOT NULL,
  team_id      INT           REFERENCES team(team_id) ON DELETE CASCADE,    -- nullable for admins
  gender       gender        ,                                            -- only for coach/player
  dob          DATE          ,                                            -- only for coach/player
  date_created TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT chk_role_profile CHECK (
    -- coaches & players MUST have gender & dob
    (user_role IN ('coach','player') AND gender IS NOT NULL AND dob IS NOT NULL)
    OR
    -- admins MUST NOT have gender & dob
    (user_role = 'admin' AND gender IS NULL AND dob IS NULL)
  )
);

-- 4. EVENTS & INVITES
CREATE TABLE events (
  event_id           SERIAL PRIMARY KEY,
  event_name         VARCHAR(100) NOT NULL,
  type               event_type   NOT NULL,
  venue              VARCHAR(200),
  description        TEXT,
  date               TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  created_by_user_id INT          REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE user_events_invitations (
  invitation_id SERIAL     PRIMARY KEY,
  event_id      INT        NOT NULL REFERENCES events(event_id) ON DELETE CASCADE,
  user_id       INT        NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  status        VARCHAR(20) NOT NULL DEFAULT 'pending',
  invited_at    TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);

-- 5. ANNOUNCEMENTS
CREATE TABLE announcements (
  announcement_id SERIAL     PRIMARY KEY,
  heading         VARCHAR(200) NOT NULL,
  description     TEXT         NOT NULL,
  image_url       TEXT,
  posted_by       INT          REFERENCES users(user_id) ON DELETE CASCADE,
  published_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- 6. ONE-TIME PIN (24-HOUR EXPIRY)
CREATE TABLE one_time_pin (
  otp_id     SERIAL   PRIMARY KEY,
  pin_code   INT      NOT NULL,
  user_id    INT      NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '24 hours')
);
