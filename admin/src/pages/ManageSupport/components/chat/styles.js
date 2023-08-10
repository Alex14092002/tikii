import styled from 'styled-components';

export const ChatWrapper = styled.div`
    .box {
        height: 100%;
        position: relative;

        &__header {
            height: 60px;
            border-bottom: 1px solid #ddd;
            margin: 10px 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &__body {
            min-height: 350px;
            overflow-y: auto;
            padding: 0 10px;
            max-height: 350px;
            &::-webkit-scrollbar {
                width: 5px;
            }

            &::-webkit-scrollbar-track {
                background: #f1f1f1;
            }

            &--items {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-bottom: 10px;

                .item {
                    display: flex;
                    gap: 10px;
                    justify-content: space-between;

                    &--sender {
                        width: fit-content;
                        align-self: flex-end;
                        align-items: flex-end;
                        flex-direction: row-reverse;
                        .item--content {
                            border-radius: 10px;
                            background-color: #6791ff;
                            color: #fff;
                            padding: 10px;
                        }

                        .item--image {
                            align-items: flex-end;
                            align-self: flex-end;
                        }
                    }

                    &--receiver {
                        width: fit-content;
                        align-self: flex-start;
                        align-items: flex-start;
                        flex-direction: row;

                        .item--content {
                            border-radius: 10px;
                            background-color: #e4e6eb;
                            color: #000;
                            padding: 10px;
                        }

                        .item--image {
                            align-items: flex-end;
                            align-self: flex-end;
                        }
                    }

                    &--image {
                        img {
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                        }
                    }

                    &--content {
                        max-width: 400px;
                    }
                }
            }
        }

        &__footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            &--input {
                width: 100%;
            }
        }
    }
`;
