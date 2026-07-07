# Database Design

## Collections

- Admin
- Profile
- Project
- Skill
- Experience
- Education
- Service
- Contact
- Resume
- Setting

---

## Admin

| Field | Type | Required |
|--------|------|----------|
| email | String | Yes |
| password | String | Yes |
| role | String | Yes |
| refreshToken | String | No |

---

## Profile

| Field | Type |
|--------|------|
| name | String |
| title | String |
| bio | String |
| location | String |
| email | String |
| phone | String |
| github | String |
| linkedin | String |
| portfolioImage | String |
| resume | String |

---

## Project

| Field | Type |
|--------|------|
| title | String |
| slug | String |
| description | String |
| technologies | Array |
| githubUrl | String |
| liveUrl | String |
| images | Array |
| featured | Boolean |
| category | String |
| status | String |

...