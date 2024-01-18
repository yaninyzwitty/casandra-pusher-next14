CREATE TABLE IF NOT EXISTS todos (
    todo_id UUID PRIMARY KEY,
    user_id TEXT,
    todo TEXT
) -- function post todo
;

CREATE TABLE IF NOT EXISTS room (
    room_id UUID PRIMARY KEY,
    user_id TEXT,
    username TEXT
);

CREATE TABLE IF NOT EXISTS message (
    message_id UUID,
    room_id UUID,
    user_id TEXT,
    username TEXT,
    message TEXT,
    created_at TIMESTAMP,
    PRIMARY KEY ((room_id), created_at)
);

CREATE CUSTOM INDEX message_room ON message(room_id) USING 'StorageAttachedIndex'