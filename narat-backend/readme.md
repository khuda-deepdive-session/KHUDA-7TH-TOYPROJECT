## Backend

### 실행

1. postgresql 세팅
2. dbmaker 실행
3. initial_data 실행
4. main 실행

### 파일 설명
```
src/
├── main.py
├── database.py                   # DB 연결
├── dbmanage.py                   # 세션별로 DB 불러오기
├── models.py                     # DB Table 정의
├── initial_data.py               # 초기 DB 내용 채우기
├── dbmaker.py                    # DB 세팅
├── responser/
│   ├── route_auth.py             # /api/auth
│   ├── route_questions.py        # /api/questions
│   ├── route_recommendations.py  # /api/recommendations
│   ├── route_states.py           # /api/states
│   ├── route_study.py            # /api/study
└── problem_database.csv          # 문제 DB: question_id,wrong_ans,correct_ans,question,explanation
```

### /api/auth
| Endpoint | Method | Description | Request | Response |
| --- | --- | --- | --- | --- |
| `/api/auth/google` | POST | Google 로그인 | `{ access_token(str) }` | `{ session_token(str), display_name(str), study_level(int) }` |
| `/api/auth/verify` | POST | 세션 검증 | `{ session_token(str) }` | `{ is_valid(bool), display_name(str), study_level(int) }` |
| `/api/auth/logout` | POST | 로그아웃 | `{ session_token(str) }` | `{ success(bool) }` |
| `/api/auth/test_session_create` | POST | 테스트 세션 생성 | `{ access_token(str) }` | `{ is_valid(bool), display_name(str), study_level(int) }` |

### /api/questions
| Endpoint | Method | Description | Request | Response |
| --- | --- | --- | --- | --- |
| `/api/questions` | GET | 문제 목록 조회 | `{ page(int), limit(int) }` | `{ questions[], total(int) }` |
| `/api/questions/{id}` | GET | 개별 문제 조회 | - | `{ question_id(int), correct_ans(str), wrong_ans(str), question(str), explanation(str) }` |

### /api/study
| Endpoint | Method | Description | Request | Response |
| --- | --- | --- | --- | --- |
| `/api/study/submit` | POST | 답안 제출 | `{ session_token(str), question_id(int), correct }` | `{ success(bool), explanation(str) }` |
| `/api/study/history` | POST | 학습 이력 조회 | `{ session_token(str), limit(int) }` | `{ history[] }` |

### /api/recommendations
| Endpoint | Method | Description | Request | Response |
| --- | --- | --- | --- | --- |
| `/api/recommendations` | POST | 추천 문제 목록 | `{ session_token(str) }` | `{ rec_id(str) }` |
| `/api/recommendations/success`  | GET | 문제 추천 완료 확인 | `{ rec_id(str) }` | `{ success(bool), recommendation[{question_id(int)}] }` |

### /api/states
| Endpoint | Method | Description | Request | Response |
| --- | --- | --- | --- | --- |
| `/api/stats/user` | POST | 사용자 통계 | `{ session_token(str) }` | `{ study_states=[item{question_id(int), created_at(datetime), correct(int: 1 is wrong, 0 is correct)}] }` |
| `/api/stats/questions/{id}` | GET | 문제별 통계 | - | `{ question_stats=[item{created_at(datetime), correct(int: 1 is wrong, 0 is correct)}] }` |

### .env
```
DB_ID=[Your User Name / default is 'postgres']
DB_PASSWORD=[Your Password]
DB_NAME=[DB name / recommended is 'khuda']
DB_HOST=localhost
DB_PORT=5432

GOOGLE_CLIENT_ID=[Your Google Client ID]
GET_URL=[Host of Model-end / localhost:3001]
TEST_SESSION_TOKEN=[Password of Getting Test Session]
```