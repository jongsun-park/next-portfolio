---
title: "Git & Github tutorials"
date: "2021-03-14"
---

[깃&깃허브 입문](https://buk.io/@kb4036/83)

# 01 깃 시작하기

사용자 정보 저장

`--global`: 현재 컴퓨터에 있는 모든 저장소에 같은 사용자 정보를 사용하도록 설정할 수 있다.

`git config --global user.name "kyunhee"`

`git config --global user.email "jump2dev@gmail.com`

## 리눅스 명령

물결표시 (~): 홈 디렉토리(폴더)

pwd: 현재 위치 경로 출력하기 // print working directory

ls: 현재 디렉터리에 어떤 파일이나 디렉터리가 있는지 확인

clear: 화면 정리 하기

`ls -la` // 옵션 추가하기

- l: 상세 정보 출력
- a: 숨긴 파일 표시
- -la / -al 순서 상관 없이 옵션 적용
- r: 파일의 정렬 순서를 거꾸로 표시
- t: 파일 작성 시간 순으로 (내림차순) 표시

`cd`: 디렉터리 이동하기 // change directory

- cd .. // 상위 디렉터리 이동
- cd Users // 하위 디렉터리 이동 (Users 디렉터리)
- cd ~ // 홈 디렉터리로 이동

리눅스에서 디렉터리를 나타내는 기호

- ~ 홈 디렉터리
- ./ 현재 디렉터리
- ../ 상위 디렉터리

디렉터리 만들기 및 삭제하기

- mkdir test // (make directory) 현재 위치에 test 디렉터리 만들기
- rm -r test // (remove) 디렉터리 삭제 & 디렉터리 안 하위 디렉터리와 파일까지 함께 삭제

빔에서 텍스트 문서 만들기

- 빔: 리눅스의 기본 편집기
- vim test.txt
  - 터미널에서 현재 디릭테리의 test.txt 파일 열기 | 생성하기 - 모드
  - 문서 작성 / 입력 모드 / I (Insert) or A (Add)를 눌러 입력 모드로 전환
  - 문서 저장 / ex 모드 / esc를 눌러 ex 모드로 전환
    - :wq // 저장 하고 종료
    - :w / :write // 편집 중인 문서를 저장
    - :q / :quit // 편집기를 종료
    - :wq (파일이름) // 편집 중이던 문서를 저장하고 종료. 파일 이름을 함께 입력하면 그 이름으로 저장
    - :q! // 문서를 저장하지 않고 종료, 확장자가 .sqp인 임시파일 생성
- git config --global core.editor "notepad++" // 기본 편집기를 노트패드로 변경 - cat test.txt // concatenate(연쇄하다) // 터미널 창에서 간단한 텍스트 문서의 내용을 확인

파일 내용 확인하기

- cat 파일 // 파일의 내용을 화면에 표시
- cat 파일1. 파일2 … 파일n > 새파일 // 파일 n개를 차례로 연결해서 새로운 파일을 만듬
- cat 파일 1 >> 파일 2 // 파일1의 내용을 파일2 끝에 연결

## 꼭 기억해야 할 명령

- cd ~ // 홈 디렉터리로 이동
- mkdir mine // 새 디렉터리 mine 생성
- cd mine // mine 디렉터리로 이동
- cd .. // 상위 디렉터리로 이동
- pwd // 현재 경로 출력
- ls // 디렉터리 내용 출력
- ls -l // 디렉터리의 상세 정보까지 출력
- ls -la // 디렉터리의 숨김 파일과 디렉터리까지 출력
- rm -r mine // 하위 디렉터리 삭제
- vim f1.txt // 빔을 사용해 f1.txt 파일 작성
- cat f1.txt // f1.txt 내용을 터미널 창에 출력
- clear // 터미널의 내용을 지움
- exit // 터미널 창을 종료

# 02 깃으로 버전 관리하기

버전 - 문서를 수정할 때마다 간단한 메모와 함께 수정 내용을 스냅숏으로 찍어서 저장한다.

## 깃 저장소 만들기

```
git init // (initialize) 깃 초기화하기
mkdir hello-git
cd hello-git
ls -la
```

```
git init // 깃을 사용할 수 있도록 디렉터리를 초기화
ls -la
```

- .git // 깃을 사용하면서 버전이 저장될 저장소 (repository)
- .git 디렉터리는 숨겨져 있다.

## 버전 만들기

프로그램 개발에서는 수정 내용이 쌓이면 새로 번호를 붙여서 이전 상태와 구별한다.

### 깃에서 버전이란?

원래 파일 이름은 그대로 유지하면서 파일에서 무엇을 변경했는지 변경 시점마다 저장할 수 있다. 또한 각 버전 마다 작업 했던 내용을 확인할 수 있고, 그 버전으로 되돌아 갈 수도 있다.

### 스테이지와 커밋 이해하기

작업 트리 (working tree / working directory)

- 파일 수정, 저장 등의 작업을 하는 디렉터리
- .git 폴더를 포함하고 있는 디렉터리
- 우리 눈에 보이는 디렉터리

스테이지 (stage / state area)

- 버전으로 만들 파일이 대기하는 곳
- 작업 트리 -> 스테이지 // 변경된 내용중 버전으로 넘겨줄 파일을 지정
- .git/index

저장소 (repository)

- 스테이지에서 대기하고 있던 파일들을 버전으로 만들어 저장 하는 곳
- .git/HEAD

커밋 (comiit)

- 스테이지 -> 저장소
- 커밋 명령을 내리면 새로운 버전이 생성되면서 스테이지에 대기하던 파일이 모두 저장소에 저장된다.

### 작업 트리에서 빔으로 문서 수정하기

```
git status
  - on branch master // 현재 브런치
  - No commits yet
  - nothing to commit
vim hello.txt
I / 1 / esc / :wq
ls -la
git status
  - untracked files // 아직 한번도 버전 관리하지 않은 파일
```

### 수정한 파일을 스테이징 하기

작업 트리에서 파일을 만들거나 수정했다면 스테이지에 수정한 파일을 추가한다.
스테이징 내용을 .git/index 파일에 저장 / 인덱스에 등록한다.

```
git add hello.txt
git status
  - changes to be committed
  - new file: hello.txt
```

스테이지에 올릴 때 경고 메시지가 나타나는 이유

- warning: LF will be replaced by CRLF in hello.txt.
- 윈도우의 줄바꿈 문자와 리눅스의 줄바꿈 문자가 다르기 때문에, 명령어를 실행 했을 때 자동으로 문자를 변환해서 커밋 한다.
- 윈도우 (CR LF) -> 리눅스 (LF)

### 스테이지에 올라온 파일 커밋하기 - git commit

```
git commit -m "message"
git status
  - nothing to commit, wokring tree clean
git log
  - 커밋한 버전에 대한 설명이 나타난다. (author, date, commit message)
```

### 스테이징과 커밋 한꺼번에 처리하기 - git commit -am

- 스테이지에 올리고 커밋하는 과정을 한꺼번에 처리할 수 있다.
- 한 한번이라도 커밋한 적이 있는 파일을 다시 커밋할 때만 사용할 수 있다.

```
vim hello.txt
I / 2 / esc / :wq
git commit -am "message2" // git commit -a -m "message2"
git status
```

## 커밋 내용 확인 하기

### 커밋 기록 자세히 살펴보기 - git log

지금까지 만든 버전이 화면에 나타나고, 각 버전마다 설명도 함께 나타난다.

### 변경 사항 확인하기 - git diff

작업 트리에 있는 파일과 스테이지에 있는 파일을 비교하거나, 스테이지에 있는 파일과 저장소에 있는 최신 커밋을 비교해서 수정한 파일을 커밋하기 전에 최종적으로 검토할 수 있다.

    - git status
    - git diff

git checkout - 작업 트리에서 수정한 파일과 최신 버전을 비교한 다음, 수정한 내용으로 다시 버전을 만들러면 스테이지에 올린 후 커밋하고 수정한 내용을 버림

## 버전 만드는 단계마다 파일 상태 알아보기

### tracked 파일과 untracked 파일

깃은 한번이라도 커밋한 한 파일의 수정 여부를 계속 추적한다. // tracked file
커밋을 한번 이라도 하지 않은 경우 수정 내역을 추적하지 않는다. // untracked file

`git log --stat`

- 커밋에 관련된 파일까지 함께 출력
- enter / 다음 로그 화면
- q / 종료

### .gitignore 파일로 버전 관리에서 제외하기

버전 관리하지 않을 파일이나 디렉터리 이름이나 파일 확장자를 입력
주로 자동으로 생성된 임시 파일, 백업 파일 등이 해당된다.

- mynote.txt
- temp/
- .swp

### unmodified, modified, staged 상태

깃의 커밋 과정 중에서 tracked 파일의 상태가 어떻게 바뀌는지

unmodified

- 수정되지 않은 상태
- nothing to commit, working tree clean

modified

- 파일이 수정되었고, 아직 스테이지에 올라가지 않은 상태
- Changes not stage for commit

staged

- `git add` 명령어를 사용해 스테이지에 올림
- Changes to be committed

커밋을 하면 파일은 unmodified 상태로 돌아 간다.

### 방금 커밋한 메시지 수정하기

`git commit --amend`

## 작업 되돌리기

### 작업 트리에서 수정한 파일 되돌리기 - git checkout

수정한 내용을 취소하고 가장 최신 버전 상태로 되돌려야 할 때
checkout으로 되돌린 내용은 다시 복구 할 수 없다.

```
git checkout -- hello.txt
git restore hello.txt
```

### 스테이징 되돌리기 - git reset HEAD 파일 이름

수정한 파일을 스테이징했을 때, 스테이징을 취소하는 방법

```
git reset HEAD hello.txt
git restore --staged hello.txt
```

### 최신 커밋 되돌리기 - git reset HEAD^

수정된 파일을 스테이징하고 커밋까지 했을 때, 가장 마지막에 한 커밋을 취소하는 방법

- HEAD^ // 현재 HEAD가 가리키는 브랜치의 최신 커밋
- 커밋도 취소되고 스테이지에서도 내려진다.
- 취소한 파일이 작업 트리에만 남게 된다.
- unstaged changes after reset

git reset 명령어

- `--soft HEAD^`// 최근 커밋을 하기 전 상태로 작업 트리를 되돌린다.
- `--mixed HEAD^` // 최근 커밋과 스테이징을 하기 전 상태로 작업 트리를 되돌린다. (기본값)
- `--hard HEAD^` // 최근 커밋과 스테이징, 파일 수정을 하기 전 상태로 작업 트리를 되돌린다. (되돌린 내용은 복구할 수 없다)

### 특정 커밋으로 되돌리기 - git reset 커밋 해시

`git reset --hard 복사한 커밋 해시`

- 해당 커밋을 삭제하는 것이 아니라 해당 커밋 이후에 만들었던 커밋을 삭제하고, 이동한다.

### 커밋 삭제하지 않고 되돌리기 - git revert

나중에 사용할 것을 대비해서 커밋을 되돌리더라도 취소한 커밋을 남겨두어야 할 때

- `git revert 1c68d469ac38e115910787f6acd58f14081be05a`
- Revert "R5"
- This reverts commit 1c68d469ac38e115910787f6acd58f14081be05a.
- 기존의 R5 버전을 지우는 대신, R5에서 변경 했던 이력을 취소한 새 커밋을 만듬

## 꼭 기억해야 할 명령

```
git config user.name = "easys" // 깃 환경에서 이름을 'easys'로 지정

git config user.email = "doit@easys.co.kr" // 깃 환경에서 메일을 ''로 지정

git init // 현재 위치에서 지역 저장소를 만듬

git status // 깃 상태를 확인

git add ch01.txt // ch01.txt 파일을 스테이지에 올림

git commit -m "ch01" // 커밋 메시지 'ch01'를 붙여 커밋

git commt -am "ch02" // 메시지 'ch02'를 붙여 스테이징과 커밋을 동시에

git log // 커밋 정보를 확인

git diff // 최근 버전과 작업 폴더의 수정 파일 사이 차이를 보여줌

git checkout hash // 지정한 커밋 해시로 이동

git reset HEAD^ // 가장 최근 커밋을 취소

git reset hash // 지정한 커밋 해시로 이동하고 이후 커밋은 취소

git revert hash // 지정한 커밋 해시의 변경 이력을 취소
```

# 03 깃과 브랜치

브랜치(branch) - 제대로 동작하는 소스는 그대로 둔 채 새 소스를 추가한 버전을 따로 만들어 관리하고, 완벽하게 완성한 다음 원래 소스에 더하기

## 브랜치란?

### 브랜치가 필요한 이유

개발 과정을 거쳐, 제품을 출시한 후 고객사 마다 다른 기능을 요구 할수 있다.

해결책, 전체를 복사해 고객사 마다 따로 버전 관리를 할 수 있다.

문제점 1. 코드가 중복된다. 2. 코드를 재활용하기 힘들다.

### 브랜치 기능 살펴보기

기본적으로 master 브랜치를 가지고, master은 항상 최신 커밋을 가리킨다.

새 브런치를 만들면 기존에 저장한 파일은 master 브랜치에 그대로 유지하면서, 기존 내용을 수정하거나 새로운 기능을 구현한 파일을 만들 수 있다.

- 분기(branch): master 브랜치에서 뻗어 나오는 새 브런치를 만드는 것
- 병합(merge): 분기 했던 브랜치를 master 브랜치에 합치는 것

## 브랜치 만들기

### 새 브랜치 만들기

```
git branch // 브랜치를 만들거나 확인하는 명령
git branch apple // apple branch 생성
git branch google
git branch ms
git branch // 모든 브랜치 조회
- `master* // 현재 작업 중인 브랜치
```

### 브랜치 사이 이동하기

```
git branch
git branch apple // apple 브랜치로 체크아웃한다.
git log --oneline // 로그를 한 줄로 간단히 출력
```

apple 브랜치가 master 브랜치에서 분기된 이후에 master 브랜치에 추가된 커밋은 apple 브랜치에 영향을 미치지 않는다.

## 브랜치 정보 확인하기

### 새 브랜치에서 커밋하기

```
git add .
git commit -m "apple content 4"
git log --oneline
  - 이전 브랜치는 "work 3" / apple 브랜치는 "apple content 4" 를 출력한다.
git log --oneline --branches
  - 해쉬에 따라 어떤 브랜치에서 만든 커밋인지 구별할 수 있다.
  - (HEAD -> apple), (master), (ms, google)
git log --oneline --branches --graph
  - 어느 브랜치에서 커밋을 했는지 점선으로 구별 할 수 있다.
  - 커밋과 커밋의 관계를 보여준다.
```

### 브랜치 사이의 차이점 알아보기

```
git log master..apple
- master 브랜치를 기준으로 apple브랜치와 비교한다.
- master에는 없고 apple에는 커밋을 출력한다.
git log master..apple // apple content 4
git log apple..master // master content 4
```

## 브랜치 병합하기

### 서로 다른 파일 병합하기

디렉토리 생성 + 깃 생성

```
git init manual-2
cd manual-2
ls -al
```

마스터 브랜치와 분기된 브랜치에서 별도의 파일을 생성하고, 커밋한 다음
마스터 브랜치로 체크아웃한 후, 분기된 브랜치를 병합할 수 있다.

```
git branch apple // apple 브랜치 생성
git checkout apple // apple 브랜치로 변경
vim work.txt
git add work.txt
git commit -m "apple work 2"
git checkout master
git merge apple
git log --oneline --branches --graph // 브랜치와 커밋들이 어떻게 병합되었는지 확인 할 수 있다.
```

빨리 감기 병합

- master 브랜치에서 분기한 후 master 브랜치에 아무 변화가 없다면 분기한 브랜치를 병합하는 것은 간단하다. 분기한 브랜치의 최신 커밋을 master 브랜치가 가리키게만 하면 됨.
- fast-forward / fast-forward merge

브랜치를 병합할 때 편집기 창이 열리지 않게 하려면

```
git merge o2 --no-edit
git merge o2 --edit
```

같은 문서의 다른 위치를 수정했을 때 병합하기

위치가 다른 경우, 브랜치를 자동으로 찹쳐주는 기능이 있다.

```
git branch o2 // 새로운 브런치 생성
git commit --am "master work 1" // 마스터 브랜치에서 커밋 1
git checkout o2 // o2 브랜치로 이동
git commit --am "o2 work 1" // o2 브랜치에서 커밋 1
git checkout master // 마스터 브랜치로 이동 - git merge o2 // 마스터 브랜치에서 o2 브랜치 병합
```

### 같은 문서의 같은 위치를 수정했을 때 병합하기 (브랜치 충돌)

```
git merge o2
- Auto-merging work.txt
- CONFLICT (content): Merge conflict in work.txt
- Automatic merge failed; fix conflicts and then commit the result.
```

수정 전

```
content
<<<<<<< HEAD // master 브랜치에서 수정한 내용
master content 2
=======
o2 content 2
>>>>>>> o2 // o2 브랜치에서 수정한 내용
# title
content
```

수정 후

```
# title
content

master content 2
# title
content

# title
content
```

```
git commit -am "merge o2 branch"
git log --oneline --branches --graph
```

### 병합이 끝난 브랜치 삭제하기

브랜치가 완전히 지워지는 것이 아니라, 다시 같은 이름의 브랜치를 만들면 예전 내용을 다시 볼 수 있다. // 브랜치를 깃의 흐름 속에서 감추는 것

`git branch -d o2`

## 브랜치 관리하기

### 브랜치에서 checkout과 reset의 동작원리

`HEAD -> master (c1) / HEAD`

- 현재 작업 트리(워킹 디렉터리)가 어떤 버전을 기반으로 작업 중인지를 가리키는 포인터
- 기본적으로 master 브랜치를 가르킨다.
- 브랜치에 담긴 커밋 중에서 가장 최근의 커밋을 가리킨다.
  - sub 브랜치를 생성하고, master 브랜치에서 커밋을 한 경우, sub 브랜치는 c1, master 브랜치는 c2를 가리킨다.
  - sub 브랜치로 checkout 하고 새로운 문서를 생성한 다음 커밋을 한 경우
- HEAD 는 sub브랜치를 가르키고, sub 브랜치는 가장 최근 커밋 s1을 가르킨다. // HEAD -> sub (s1)
  - 브랜치가 여러 개 일때는 현재 브랜치가 아닌 다른 브랜치에 있는 커밋을 골라서 최신 커밋으로 지정할 수 있다.
- sub 브랜치에서 master 브랜치에 있는 c2 커밋을 sub브랜치의 최신 커밋으로 지정할 수 있다.

git reset 명령을 사용하면 현재 브랜치가 가리키는 커밋을 여러 브랜치 사이를 넘나들면서 제어할 수 있다.

```
git log --oneline --branches
git reset (master branch hash)
git log --oneline --branches --graph
```

`git checkout` // HEAD를 제어해서 브랜치를 이동할 수 있다

`git reset`

- HEAD가 가리키고 있는 브랜치의 최신 커밋을 원하는 커밋으로 지정할 수 있다.
- 연결이 끊긴 커밋은 삭제된다.

### 수정 중인 파일 감추기 및 되돌리기 - git stash

아직 커밋하지 않고 작업 중인 파일들을 잠시 감춰둘 수 있다. 그리고 당장 필요한 작업들을 끝낸 후 다시 감춰둔 파일을 꺼내와 작업한다.

```
git stash
git stash save
```

- staged 된 파일은 커밋 대상에서 감춰진다.
- 같은 방법으로 여러 파일을 수정한 후 따로 보관할 수 있으며, 이렇게 감춘 파일들은 stash 목록에서 확인할 수 있다.
- 가장 최근에 보관한 것이 `stash@{0}` 에 담기고, 먼저 감춘 것은 아래로 옮겨 진다.
- stash 스택(stack) // 선입후출 방식의 저장 공간
- `git stash pop` // 감춰둔 파일을 꺼내와 수정하거나 커밋할 수 있다.

stash apply와 stash drop

- `git stash apply`
  - 저장된 수정 내용을 나중에 또 사용할지도 모르는 경우
  - stash 목록에서 가장 최근 항목을 되돌리지만 저장했던 내용은 그대로 남겨둔다.
- `git stash drop`
  - stash 목록에서 가장 최근 항목을 삭제한다.

## 꼭 기억해야 할 명령

```

git branch fixed // 새로운 브랜치 fixed를 만든다

git checkout fixed // fixed 브랜치로 체크아웃한다

git log --oneline // 커밋 로그에서 한 줄에 한 커밋씩 표시한다.

git add . // 수정한 전체 파일을 스테이지에 올린다.

git log --branches --graph // 커밋 로그에 각 브랜치의 커밋을  그래프로 표시한다.

git merge fixed // fixed 브랜치를 master 브랜치에 병합한다.

cat edit.txt // 터미널 창에서 edit.txt 내용을 확인한다.

git init doit // doit 디렉터리를 만드는 동시에 지역 저장소를 만든다.

git reset [c1 hash] // 현재 커밋을 다른 브랜치에 있는 c1 커밋으로 되돌린다.

git branch -d fixed // 병합이 끝난 fixed 브랜치를 삭제한다.

git stash // 작업 트리의 수정 내용을 따로 보관해서 감춘다.

git stash pop // 따로 보관했던 수정 내용을 꺼내온다.
```

# 04 깃허브로 백업하기

## 원격 저장소와 깃허브

지역 저장소(local repository)

### 원격 저장소(remote repository)

지역 저장소가 아닌 컴퓨터나 서버에 만든 저장소

프로젝트의 규모가 커지거나 다른 사람과 협업해야 하는 경우, 원격 저장소의 역할이 더욱 중요해진다.

### 깃허브로 할 수 있는 일들

1. 원격 저장소에서 깃을 사용할 수 있다.
2. 지역 저장소를 백업할 수 있다.
3. 협업 프로텍트에 사용할 수 있다.
4. 자신의 개발 이력을 남길 수 있다.
5. 다른사람의 소스를 살펴볼 수 있고, 오픈소스에 참여할 수도 있다.

## 깃허브 시작하기

## 지역 저장소를 원격 저장소에 연결하기

`git remote add origin [복사한 주소 붙여넣기]`

- 원격 저장소(remote)에 origin을 추가(add) 하겠다고 깃에 알려주는 것
- origin은 깃허브 저장소 주소를 가리킨다.

```
git remote -v
- origin https://github.com/jongsun-park/git-loc.git (fetch) - origin https://github.com/jongsun-park/git-loc.git (push)
```

## 원격 저장소에 올리기 및 내려받기

push - 원격 저장소로 올리는 것
pull - 지역 저장소로 내려받는 것

### 원격 저장소에 파일 올리기 - git push

`git push -u origin main`

- 지역 저장소의 브랜치를 origin, 즉 원격 저장소의 master 브랜치로 푸시하라는 명령어
- -u: 처음 한번 만 사용, 지역 저장소의 브랜치를 원격 저장소의 master 브랜치에 연결하기 위한 것

`git push`

- 지역 저장소의 브랜치와 origin의 main 브랜치와 연결했기 때문에 다시 파일을 푸시할 때는 git push 라고만 해도된다.

### 깃허브 사이트에서 직접 커밋하기

### 원격 저장소에서 파일 내려받기 - git pull

원격 저장소에 있는 소스 파일을 다른 사용자가 수정 했거나 깃허브 사이트에서 직접 커밋하면 지역 저장소와 차이가 생긴다. 원격 저장소와 상태를 같게 만들기 위해 원격 저장소의 소스를 지역 저장소에 가져올 수 있다. (pull)

`git pull origin main`

### 깃허브 저장소 화면 살펴보기

## 깃허브에 SSH 원격 접속하기

### SSH 원격 접속이란

SSH

- Secure Shell, 강화된 안전한 방법으로 정보를 교환하는 방식
- 일반적으로 사용자의 아이디와 비밀번호를 입력해서 계정을 인증해야 한다. SSH 원격 접속은, SSH 생성기를 사용해 public키와 private키를 생성해서 사용자의 기기를 인증하는 방식이다.

SSH 키 생성하기

- `ssh-keygen` // SSH 키가 저장되는 디렉터리가 생성된다. (.ssh)
- `cd ~/.shh` // .ssh 파일은 홈 디렉터리 하부에 생성 된다.
  - id_rsa // 프라이빗 키
  - id_rsa.pub // 퍼블릭 키

깃허브에 퍼블릭 키 전송하기

- SSH 방식으로 접근하려면 먼서 사용자 컴퓨터에 만들어져 있는 퍼블릭 키를 깃허브 서버로 전송한 다음 저장한다.
- 사용자 컴퓨터에서 깃허브 저장소에 접속하면, 사용자 컴퓨터에 있는 프라이빗 키와 깃허브의 퍼블릭 키를 비교하여, 두 키가 맞으면 저장소와 연결한다.
- `cat id_rsa.pub` 를 복사해서 github / account settings / SSH 에 추가한다.

SSH 주소를 원격 저장소 연결하기

- 깃허브 저장소를 생성 할 때 SSH 링크를 복사하여 로컬 저장소에 연결한다.
- SSH을 통해 연결 되었으므로, 사용자의 컴퓨터에서 원격 저장소에 접속 했을 때 인증 요청하지 않는다.

```
git init connect-ssh
cd connect-ssh
git remote add origin [git@github.com:jongsun-park/git-loc-ssh.git]
```

### 꼭 기억해야 할 명령

```

git remote add origin [저장소 주소] // 원격 저장소에 연결.

git remote -v // 원격 저장소에 연결됐는지 확인.

git push -u origin main // 지역 저장소의 커밋을 맨 처음 원격 저장소로 올린다.

git push (git push origin main) // (한번 올리기 한 후에) 지역 저장소의 커밋을 원격 저장소로 올린다.

git pull (git pull origin main) // 원격 저장소의 커밋을 지역 저장소로 가져온다.
ssh-genkey // SSH 키를 만든다.
```

# 05 깃허브로 협업하기

하나의 원격 저장소를 중심으로 둘 이상의 지역 저장소와 연결하고, 연결된 원격 저장소와 지역 저장소를 동기화 한다.

## 여러 컴퓨터에서 원격 저장소 함께 사용하기

원격 저장소 복제하기

- git clone - 클론 / 클로닝: 원격 저장소를 지역 저장소로 똑같이 가져 오는 것
- `git clone [복사한 주소] git_home` // 해당 디렉터리가 없으면 자동으로 생성된다.
- `git clone [복사한 주소] git_office`

개인 컴퓨터에서 작업하고 올리기 (git_home)

```
cd git_home
vim f1.txt
commit -am "add c"
git push
```

회사 컴퓨터에서 내려받아 작업하기 (got_office)

```
cd ~/git_office
git pull
```

하나의 원격 저장소에 둘 이상의 컴퓨터를 연결해서 사용한다면 풀과 푸시를 습관화하는 것이 좋다. (최신 소스 유지)

## 원격 브랜치 정보 가져오기

최신 커밋을 합치기 전에 원격 저장소에 어떤 변화가 있는지 확인.
원격 브랜치에서 정보를 가져오고, 가져온 정보를 지역 저장소에 병합할 수 있다.

### 원격 master 브랜치

- 로컬: master 브랜치
- 원격: main 브랜치 // 원격 저장소에 있는 HEAD는 원격 저장소의 master 브랜치를 가리킬 것이고, 원격 master 브랜치는 최신 커밋을 가르킨다. // HEAD -> main -> latest commit

- HEAD -> main, origin/main, origin/HEAD
  - HEAD -> master: 지역 저장소
  - origin/master: 원격 저장소
- Your branch is ahead of 'origin/main' by 1 commit.
  - 당신의 브랜치가 'origin/main' (원격 저장소) 보다 1 커밋 앞서고 있습니다.

원격 브랜치 정보 가져오기

- `git fetch -pull`: 원격 저장소의 커밋을 가져와서 무조건 지역 저장소와 합침
- fetch: 원격 브랜치에 어떤 변화가 있는지 그 정보만 가져온다.

```
git fetch
git status
```

- Your branch is behind 'origin/main' by 1 commit, and can be fast-forwarded.

  - 당신의 브랜치는 1 커밋 뒤처져 있습니다. (중복 되는 코드가 없기 때문에) 빠른 병합이 가능합니다.

  - 페치로 가져온 최신 정보는 origin/master 브랜치가 아닌 FETCH_HEAD라는 브랜치로 가져오고, 가져온 정보는 지역 저장소에 반영되지 않는다.

```
git checkout FETCH_HEAD // fetch 로 가져온 커밋 정보
git log // origin/master, origin/HEAD, 즉 최신 커밋이다
git checkout main // main 브랜치로 변경 후
git merge FETCH_HEAD // 페치로 가져온 커밋을 병합
```

## 협업의 기본 알아보기

공동 작업자 추가하기 - 공개 저장소든 비공개 저장소든 여러 사람이 협업한다면 승인된 공동 작업자에게만 커밋을 올릴 수 있는 권한을 줘야한다.

작업 환경 구성하기

해당 저장소에만 적용되는 user 정보를 입력한다.

```
git init manuals
cd manuals
git config user.name "사용자이름"
git config user.email 메일주소
```

원격 저장소에 첫 커밋 푸시하기

```
vim overview.txt
git add overview.txt
git commit -m "overview"
git remote add origin 복사한 저장소 주소
git push -u origin master
```

공동 작업자 컴퓨터에 원격 저장소 복제하기

```
git clone 원격 저장소 주소
```

첫 번째 커밋이 아니라면 풀 먼저하기

- 원격 저장소에 풀 하지 않은 커밋이 있다면 (다른 사용자가 커밋을 한 경우) 커밋 할려고 할 때 에러가 발생한다.
- error: failed to push some refs to 'https://..../manual.git'

```
git pull - git push -u origin master
```

원격 저장소의 최신 커밋 정보를 가져온 다음 지역 저장소의 커밋을 올려야 한다.

## 협업에서 브랜치 사용하기

새로 만든 브랜치 푸시하기

```
git pull // 원격 저장소에 다른 사용자가 커밋한 내용이 있는지 확인한다.
git checkout -b f
- -b: 새로운 브랜치를 만들고 체크 아웃 할 수 있다. (이미 존재하는 경우 해당 브랜치로 체크아웃 한다)
vim f1.txt
git add f1.txt
git commit -m "features1"
git push origin f
- 원격저장소(origin)에 f 브랜치를 푸시한다.
```

풀 리퀘스트로 푸시한 브랜치 병합하기

- 푸시한 브랜치는 풀 리퀘스트를 통해 병합해야 원격 저장소에 반영된다.
- github 페이지
  - [New pull request]
  - [Create pull request]
  - [Pull request]
  - [Merge pull request]
  - [Confirm merge]
- 깃허브에서 협업할 때는 보통 작업자마다 브랜치를 만들어서 진행하고, 작업 중간중간 풀 리퀘스트를 보내서 master 브랜치에 병합한다.
- 다른 작업자의 변경 내용을 바로 반영하기 위해 항상 pull 부터 한다음 자신의 작업을 진행하는 것이 좋다.

```
git clone 원격 저장소 주소 myhome // 원격 저장소를 myhome이라는 지역 저장소에 복제한다.
git fetch // 원격 저장소의 커밋을 가져오기만 하고 병합하지 않는다.
git checkout FETCH_HEAD // 패치로 가져온 정보가 있는 브랜치로 이동한다.
git merge FETCH_HEAD // 패치로 가져온 정보가 있는 브랜치를 master 브랜치에 병합한다.
git config user.name // 현재 깃 환경에서 사용할 이름을 지정한다.
git config user.email // 현재 깃 환경에서 사용할 이메일을 지정한다.
git checkout -d fixed // fixed 브랜치를 만드는 것과 동시에 체크 아웃한다.
git push origin f // 원격 저장소에 f 브랜치의 커밋을 올린다.
```
